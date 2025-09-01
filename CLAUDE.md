/**
 * @file CLAUDE.md
 * @description Claude Code 專案指引文件 - LaunchCraft iOS App Store 上架資料生成器
 * @author Claude
 * @date 2025-09-01
 * @version 1.1.0
 * 
 * 此文件提供 Claude Code (claude.ai/code) 在處理此專案時的指引和規範。
 */

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述

LaunchCraft - iOS App Store 上架資料快速生成器，是一個使用 Next.js 15.5.2 創建的 TypeScript 專案，使用了 App Router 架構，配置了 Tailwind CSS v4 和 Turbopack。本專案旨在利用 LLM 技術協助開發者快速生成高品質的 App Store 上架文案。

## 常用開發命令

```bash
# 啟動開發伺服器（使用 Turbopack）
npm run dev

# 建構生產版本
npm run build

# 啟動生產伺服器
npm start

# 執行程式碼檢查
npm run lint
```

## 專案架構

### 技術棧
- **框架**: Next.js 15.5.2 (App Router)
- **語言**: TypeScript
- **樣式**: Tailwind CSS v4
- **UI 元件**: Shadcn/ui (待安裝)
- **狀態管理**: Zustand (待安裝)
- **LLM API**: OpenAI GPT-4 (待整合)
- **字型**: Geist 和 Geist Mono (透過 next/font)
- **建構工具**: Turbopack

### 目錄結構
```
launch_craft/
├── app/                    # Next.js App Router 頁面和元件
│   ├── layout.tsx         # 根版面配置檔案
│   ├── page.tsx          # 首頁元件
│   └── globals.css       # 全域樣式和 Tailwind 指令
├── docs/                  # 專案文檔
│   ├── prd.md           # 產品需求文檔
│   └── todo.md          # 功能開發任務清單
├── components/           # 共用元件 (待建立)
├── lib/                  # 工具函數 (待建立)
├── services/            # API 服務 (待建立)
├── types/               # TypeScript 類型定義 (待建立)
├── hooks/               # 自定義 Hooks (待建立)
└── public/              # 靜態資源檔案
```

### 路徑別名
專案配置了 `@/*` 路徑別名，映射到專案根目錄，可以使用如 `@/app/components` 的導入路徑。

### TypeScript 配置
- 嚴格模式已啟用 (`strict: true`)
- 目標編譯版本: ES2017
- JSX: preserve (由 Next.js 處理)

### ESLint 配置
使用 Next.js 推薦的配置，包括 `next/core-web-vitals` 和 `next/typescript`，忽略 `node_modules`, `.next`, `out`, `build` 目錄。

## 開發規範與注意事項

### 基本規範
- 頁面元件位於 `app/` 目錄下，遵循 Next.js App Router 約定
- 編輯 `app/page.tsx` 時頁面會自動熱更新
- 專案使用 Turbopack 進行更快的開發建構
- 一律使用繁體中文回應和註解
- 每個檔案的頂部要加上詳細的註解區塊

### 專案管理規範
1. **規劃文件**：專案規劃書已寫入 `docs/prd.md`
2. **任務追蹤**：功能拆解清單已寫入 `docs/todo.md`
3. **進度更新**：每完成一個 todo 功能，需在 `todo.md` 中使用 ~~文字~~ 劃掉對應項目
4. **版本控制**：重要變更需更新相關文件的版本號和日期

## 開發進度追蹤

### 已完成任務
- ✅ 建立 docs 目錄
- ✅ 撰寫產品需求文檔 (prd.md)
- ✅ 撰寫功能拆解清單 (todo.md)
- ✅ 更新 CLAUDE.md 專案追蹤說明
- ✅ 安裝所有核心依賴套件（Shadcn/ui, Zustand, React Hook Form, Zod, Framer Motion, OpenAI SDK）
- ✅ 建立專案目錄結構
- ✅ 設定環境變數檔案
- ✅ 建立 Header 和 Footer 元件
- ✅ 建立全域 Store (Zustand)
- ✅ 設計並實作首頁
- ✅ 整合基礎 UI 元件

### 當前階段
**Phase 1: MVP 核心功能開發**
- 專案初始化與環境設定
- UI/UX 基礎建設
- OpenAI API 整合
- 核心文字生成功能

### 下一步行動
1. 安裝必要的依賴套件 (Shadcn/ui, Zustand, React Hook Form, Zod)
2. 建立專案基礎架構和目錄結構
3. 設定 OpenAI API 環境變數
4. 開發基礎 UI 元件

## 相關文件連結
- [產品需求文檔](/docs/prd.md)
- [開發任務清單](/docs/todo.md)
- [Next.js 文檔](https://nextjs.org/docs)
- [Tailwind CSS 文檔](https://tailwindcss.com/docs)

---

*最後更新：2025-09-01*  
*版本：1.1.0*