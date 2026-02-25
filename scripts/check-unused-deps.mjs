import fs from "node:fs";
import path from "node:path";

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

const sourceRoots = [
  "src",
  "vite.config.ts",
  "vitest.config.ts",
  "tailwind.config.ts",
  "postcss.config.js",
  "eslint.config.js",
];

const dependencyEntries = Object.entries(packageJson.dependencies ?? {});
const devDependencyEntries = Object.entries(packageJson.devDependencies ?? {});

const fileExtensions = new Set([".js", ".mjs", ".cjs", ".ts", ".tsx", ".jsx", ".json"]);

const allowedUnusedDevDependencies = new Set([
  "@types/node",
  "@types/react",
  "@types/react-dom",
  "autoprefixer",
  "eslint",
  "jsdom",
  "postcss",
  "typescript",
]);

const moduleRegex = /from\s+["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)|require\(\s*["']([^"']+)["']\s*\)|import\s+["']([^"']+)["']/g;

function collectFiles(targetPath, files = []) {
  if (!fs.existsSync(targetPath)) return files;

  const stats = fs.statSync(targetPath);
  if (stats.isFile()) {
    if (fileExtensions.has(path.extname(targetPath))) files.push(targetPath);
    return files;
  }

  for (const entry of fs.readdirSync(targetPath)) {
    collectFiles(path.join(targetPath, entry), files);
  }

  return files;
}

function toPackageName(specifier) {
  if (!specifier || specifier.startsWith(".") || specifier.startsWith("/") || specifier.startsWith("@/")) {
    return null;
  }

  const normalized = specifier.startsWith("node:") ? specifier.slice(5) : specifier;
  if (normalized.startsWith("@")) {
    const [scope, name] = normalized.split("/");
    return scope && name ? `${scope}/${name}` : normalized;
  }

  return normalized.split("/")[0];
}

const files = sourceRoots.flatMap((entry) => collectFiles(entry));
const referencedPackages = new Set();

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  for (const match of content.matchAll(moduleRegex)) {
    const specifier = match[1] ?? match[2] ?? match[3] ?? match[4];
    const packageName = toPackageName(specifier);
    if (packageName) referencedPackages.add(packageName);
  }
}

const unusedDependencies = dependencyEntries
  .map(([name]) => name)
  .filter((name) => !referencedPackages.has(name))
  .sort();

const unusedDevDependencies = devDependencyEntries
  .map(([name]) => name)
  .filter((name) => !referencedPackages.has(name) && !allowedUnusedDevDependencies.has(name))
  .sort();

if (unusedDependencies.length === 0 && unusedDevDependencies.length === 0) {
  console.log("No unused direct dependencies found.");
  process.exit(0);
}

if (unusedDependencies.length) {
  console.error("Unused dependencies:");
  for (const name of unusedDependencies) {
    console.error(`  - ${name}`);
  }
}

if (unusedDevDependencies.length) {
  console.error("Unused devDependencies:");
  for (const name of unusedDevDependencies) {
    console.error(`  - ${name}`);
  }
}

process.exit(1);
