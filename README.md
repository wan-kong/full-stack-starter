# FullStackStarter

一个基于 Bun + Turborepo 的全栈认证脚手架，包含 Web 管理端、Elysia API、Better Auth、Prisma(MySQL) 与共享 UI/配置包。

## 技术栈

- Runtime: Bun 1.3+
- Monorepo: Turborepo + Bun Workspaces
- Frontend: Next.js 16 (App Router) + React 19 + Tailwind CSS 4
- Backend: Elysia
- Auth: Better Auth（含 GitHub OAuth、2FA、API Key 扩展）
- Database: Prisma + MySQL (MariaDB adapter)
- Shared Packages: `@repo/ui` / `@repo/env` / `@repo/api` / `@repo/auth`
- Code Quality: Ultracite + Biome + TypeScript

## 仓库结构

```text
FullStackStarter/
├── apps/
│   ├── web/         # Next.js 16 管理端
│   └── server/      # Elysia API 服务
├── packages/
│   ├── api/         # API 客户端封装（eden treaty）
│   ├── auth/        # Better Auth 配置与逻辑
│   ├── config/      # 共享 tsconfig 等配置
│   ├── db/          # Prisma schema / migrate / studio
│   ├── env/         # 环境变量校验（server/web）
│   ├── mail/        # 邮件模板与发送
│   └── ui/          # 共享组件库
└── turbo.json
```

## 环境要求

- Bun >= 1.3
- MySQL/MariaDB 可用实例

## 快速开始

1. 安装依赖

```bash
bun install
```

2. 配置环境变量

`apps/server/.env`

```bash
DATABASE_URL=mysql://USER:PASSWORD@HOST:3306/DB_NAME
BETTER_AUTH_SECRET=replace-with-at-least-32-chars
BETTER_AUTH_URL=https://web.localhost
BETTER_AUTH_API_KEY=optional_for_better_auth_cloud

RESEND_SEND_EMAIL="FullStackStarter<welcome@example.com>"
RESEND_API_KEY=re_xxx

GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx
```

`apps/web/.env`

```bash
NEXT_PUBLIC_SERVER_URL=https://web.localhost
BACKEND_URL=https://server.localhost
```

3. 初始化数据库

```bash
bun run db:generate
bun run db:migrate
```

4. 启动开发环境（web + server）

```bash
bun run dev
```

## 常用命令（根目录）

- `bun run dev`: 启动所有开发服务（turbo dev）
- `bun run build`: 构建所有包/应用（turbo build）
- `bun run check-types`: 运行工作区类型检查
- `bun run dev:server`: 仅启动 `apps/server`
- `bun run auth:generate`: 根据 Better Auth 配置生成 auth schema
- `bun run db:generate`: Prisma generate
- `bun run db:migrate`: Prisma migrate dev
- `bun run db:studio`: Prisma Studio
- `bun run check`: 代码检查
- `bun run fix`: 自动修复

## 生产构建

```bash
bun run build
```

然后分别在各应用目录启动：

```bash
cd apps/server && bun run start
cd apps/web && bun run start
```

## 说明

- 当前 workspace 包名仍为 `@repo/*`（内部依赖标识），项目展示名为 `FullStackStarter`。
- `apps/web` 通过 Next.js rewrite 将 `/api/*` 转发到 `BACKEND_URL`。
