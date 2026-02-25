# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS


## 日志规范（Logging Policy）

为避免日志噪音并支持后续接入统一上报，项目内日志按以下级别处理：

- `user_error`（用户错误）
  - 定义：由用户输入或访问行为触发的预期错误（例如访问不存在路由 404）。
  - 处理：可记录结构化上下文，默认以 `warn` 输出，便于产品与运营排查。
- `system_exception`（系统异常）
  - 定义：接口失败、运行时异常、依赖不可用等非预期问题。
  - 处理：应优先上报到监控系统；未接入上报时默认以 `error` 输出。
- `debug`（调试信息）
  - 定义：仅供开发排查的临时诊断信息。
  - 处理：仅在开发环境输出，生产环境默认静默。

实现建议：统一调用 `src/lib/logger.ts` 提供的 `logEvent`，避免直接散落 `console.*`。如需接入外部平台，可通过 `setLogReporter` 注入上报函数。

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
