#!/usr/bin/env node
import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const PRIORITY_PACKAGES = new Set(["vite", "vitest", "typescript-eslint", "eslint"]);

function parseArgs(argv) {
  const args = { input: null, outputDir: "reports" };
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--input") {
      args.input = argv[i + 1];
      i += 1;
    } else if (token === "--output-dir") {
      args.outputDir = argv[i + 1];
      i += 1;
    }
  }
  return args;
}

function parseVersion(version) {
  const cleaned = String(version ?? "").replace(/^[~^]/, "");
  const match = cleaned.match(/(\d+)\.(\d+)\.(\d+)/);
  if (!match) return null;
  return match.slice(1).map((x) => Number(x));
}

function classify(current, latest) {
  const c = parseVersion(current);
  const l = parseVersion(latest);
  if (!c || !l) return "unknown";
  if (l[0] > c[0]) return "major";
  if (l[1] > c[1]) return "minor";
  if (l[2] > c[2]) return "patch";
  return "up-to-date";
}

function loadOutdatedJson(inputPath) {
  if (inputPath) {
    return JSON.parse(readFileSync(inputPath, "utf8"));
  }

  try {
    const output = execSync("npm outdated --json", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    const parsed = output.trim() ? JSON.parse(output) : {};
    if (parsed?.error) {
      throw new Error(parsed.error.summary || parsed.error.detail || "npm outdated 返回错误");
    }
    return parsed;
  } catch (error) {
    const stdout = error.stdout?.toString() ?? "";
    if (stdout.trim().startsWith("{")) {
      const parsed = JSON.parse(stdout);
      if (parsed?.error) {
        throw new Error(parsed.error.summary || parsed.error.detail || "npm outdated 返回错误");
      }
      return parsed;
    }

    const message = (error.stderr?.toString() || error.message || "Unknown error").trim();
    throw new Error(`无法获取 npm outdated 数据：${message}`);
  }
}

function buildReport(outdatedMap) {
  const buckets = { patch: [], minor: [], major: [], unknown: [] };

  for (const [name, meta] of Object.entries(outdatedMap)) {
    const type = classify(meta.current, meta.latest);
    const row = {
      name,
      current: meta.current,
      wanted: meta.wanted,
      latest: meta.latest,
      location: meta.location,
      type,
      priority: PRIORITY_PACKAGES.has(name),
      action:
        type === "major"
          ? "单独分支验证（含回归测试）"
          : PRIORITY_PACKAGES.has(name)
            ? "优先纳入开发链路升级批次"
            : "常规批次升级",
    };

    if (buckets[type]) {
      buckets[type].push(row);
    } else {
      buckets.unknown.push(row);
    }
  }

  for (const bucket of Object.values(buckets)) {
    bucket.sort((a, b) => Number(b.priority) - Number(a.priority) || a.name.localeCompare(b.name));
  }

  return buckets;
}

function toMarkdown(report, generatedAt) {
  const sections = ["patch", "minor", "major", "unknown"];
  const lines = [
    "# npm 可升级依赖清单",
    "",
    `生成时间：${generatedAt}`,
    "",
    "优先关注开发链路包：`vite`、`vitest`、`typescript-eslint`、`eslint`。",
    "",
  ];

  for (const section of sections) {
    const items = report[section] ?? [];
    lines.push(`## ${section} (${items.length})`, "");
    if (!items.length) {
      lines.push("- 无", "");
      continue;
    }

    lines.push("| package | current | wanted | latest | 优先级 | 建议动作 |", "| --- | --- | --- | --- | --- | --- |");
    for (const item of items) {
      lines.push(
        `| ${item.name} | ${item.current} | ${item.wanted} | ${item.latest} | ${item.priority ? "高（开发链路）" : "普通"} | ${item.action} |`,
      );
    }
    lines.push("");
  }

  lines.push("## 升级执行建议", "");
  lines.push("- 先处理 `patch/minor`，并优先合并开发链路包（`vite`、`vitest`、`typescript-eslint`、`eslint`）。");
  lines.push("- `major` 升级请逐包创建独立分支，执行完整 lint/test/build 回归后再合并。");
  lines.push("");

  return lines.join("\n");
}

function main() {
  const { input, outputDir } = parseArgs(process.argv);
  const generatedAt = new Date().toISOString();
  const stamp = generatedAt.replace(/[:.]/g, "-");
  mkdirSync(outputDir, { recursive: true });

  const jsonPath = path.join(outputDir, `npm-outdated-${stamp}.json`);
  const mdPath = path.join(outputDir, `npm-outdated-${stamp}.md`);

  try {
    const outdatedMap = loadOutdatedJson(input);
    const report = buildReport(outdatedMap);

    writeFileSync(
      jsonPath,
      JSON.stringify({ generatedAt, source: input ? `file:${input}` : "npm outdated --json", report }, null, 2),
      "utf8",
    );
    writeFileSync(mdPath, toMarkdown(report, generatedAt), "utf8");
  } catch (error) {
    const fallback = {
      generatedAt,
      source: input ? `file:${input}` : "npm outdated --json",
      error: error.message,
      report: { patch: [], minor: [], major: [], unknown: [] },
    };
    writeFileSync(jsonPath, JSON.stringify(fallback, null, 2), "utf8");
    writeFileSync(
      mdPath,
      ["# npm 可升级依赖清单（执行失败）", "", `生成时间：${generatedAt}`, "", `错误：${error.message}`, "", "请在具备 registry 权限的环境重新执行 `npm run deps:outdated:export`。", ""].join("\n"),
      "utf8",
    );
  }

  console.log(`已导出：\n- ${jsonPath}\n- ${mdPath}`);
}

main();
