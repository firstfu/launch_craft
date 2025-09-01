# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个使用 Next.js 15.5.2 创建的 TypeScript 项目，使用了 App Router 架构，配置了 Tailwind CSS v4 和 Turbopack。

## 常用开发命令

```bash
# 启动开发服务器（使用 Turbopack）
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 运行代码检查
npm run lint
```

## 项目架构

### 技术栈
- **框架**: Next.js 15.5.2 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4
- **字体**: Geist 和 Geist Mono (通过 next/font)
- **构建工具**: Turbopack

### 目录结构
- `app/`: Next.js App Router 页面和组件
  - `layout.tsx`: 根布局文件，定义了全局 HTML 结构和元数据
  - `page.tsx`: 主页组件
  - `globals.css`: 全局样式和 Tailwind 指令
- `public/`: 静态资源文件

### 路径别名
项目配置了 `@/*` 路径别名，映射到项目根目录，可以使用如 `@/app/components` 的导入路径。

### TypeScript 配置
- 严格模式已启用 (`strict: true`)
- 目标编译版本: ES2017
- JSX: preserve (由 Next.js 处理)

### ESLint 配置
使用 Next.js 推荐的配置，包括 `next/core-web-vitals` 和 `next/typescript`，忽略 `node_modules`, `.next`, `out`, `build` 目录。

## 开发注意事项

- 页面组件位于 `app/` 目录下，遵循 Next.js App Router 约定
- 编辑 `app/page.tsx` 时页面会自动热更新
- 项目使用 Turbopack 进行更快的开发构建
- 1、請將規畫書寫成 prd.md 放在 docs 目錄下。                                                                
2、請將規畫書拆解成不同的子功能 todo, 然後放在 docs 目錄下的 todo.md 文件。        3、更新CLAUDE.md 文件，請寫上每完成一個 todo的功能，要將 todo.md 裡面對應的功能劃掉。   
4、一律用繁體中文回應。  
5、每個文件的頂部要加上詳細的註解。