# 依赖治理说明

## lovable-tagger 保留性评估（2026-02）

- 现状：`lovable-tagger` 仅在 `vite.config.ts` 中作为开发期插件使用，不参与生产构建产物。
- 影响：该插件会引入一套独立的 `esbuild@0.25.x`，而 Vite 5 主链路使用 `esbuild@0.21.x`，导致仓库出现双主版本。
- 结论：在当前项目中 `lovable-tagger` **非必须保留**；移除后不会影响常规 Vite 开发、构建与测试流程。

## 与 Vite 对齐的可选方案

1. **当前已采用：移除 `lovable-tagger`**
   - 直接消除额外 `esbuild` 主版本，保持与 Vite 主链路一致。
2. **备选方案：后续若必须恢复 Lovable 标记能力**
   - 优先评估是否存在不额外绑定新 `esbuild` 主版本的 `lovable-tagger` 新版。
   - 或在升级到新 Vite 大版本时同步评估其 `esbuild` 基线，尽量与插件侧主版本趋同。

## 复查机制

- 建议按季度复查一次（或在 Vite 大版本升级前复查）：
  - `npm ls esbuild` 的主版本数量；
  - 是否出现新的 `lovable-tagger`/替代插件可与当前 Vite 基线对齐。
