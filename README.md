# LaunchCraft 🚀

> iOS App Store 上架資料快速生成器 - 利用 AI 技術協助開發者快速生成高品質的 App Store 上架文案

## 📱 關於 LaunchCraft

LaunchCraft 是一個專為 iOS 開發者設計的智慧型工具，協助您在短時間內生成符合 App Store 規範的完整上架資料。透過先進的 GPT-4 技術，我們能夠根據您的應用程式特性，自動生成吸引人的文案內容。

### ✨ 核心功能

- **🤖 AI 驅動文案生成** - 使用 OpenAI GPT-4 模型，智慧生成高品質文案
- **📝 完整上架資料** - 一次生成所有必要的 App Store 欄位內容
- **🎯 多語言支援** - 支援繁體中文、簡體中文、英文等多種語言
- **✏️ 即時編輯** - 生成後可直接編輯調整，確保內容符合需求
- **👁️ 預覽模式** - 模擬 App Store 實際顯示效果
- **📋 一鍵複製** - 快速複製文案到剪貼簿

## 🛠️ 技術架構

### 前端技術
- **Next.js 15.5.2** - React 框架，採用 App Router
- **TypeScript** - 類型安全的 JavaScript
- **Tailwind CSS v4** - 實用優先的 CSS 框架
- **Shadcn/ui** - 現代化 UI 元件庫
- **Zustand** - 輕量級狀態管理

### 後端整合
- **OpenAI API** - GPT-4 模型整合
- **Next.js API Routes** - 無伺服器 API 端點

## 🚀 快速開始

### 系統需求
- Node.js 18.17 或更高版本
- npm 或 yarn 套件管理器

### 安裝步驟

1. **複製專案**
```bash
git clone https://github.com/yourusername/launch_craft.git
cd launch_craft
```

2. **安裝依賴套件**
```bash
npm install
```

3. **設定環境變數**
```bash
cp .env.example .env.local
```
編輯 `.env.local` 並加入您的 OpenAI API 金鑰：
```
OPENAI_API_KEY=sk-your-api-key-here
```

4. **啟動開發伺服器**
```bash
npm run dev
```

開啟瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

## 📂 專案結構

```
launch_craft/
├── app/                    # Next.js App Router 頁面
│   ├── layout.tsx         # 根版面配置
│   ├── page.tsx          # 首頁
│   └── generator/        # 生成器頁面
├── components/           # React 元件
│   ├── ui/              # Shadcn/ui 元件
│   ├── forms/           # 表單元件
│   └── preview/         # 預覽元件
├── lib/                  # 工具函數
├── services/            # API 服務
├── store/               # Zustand 狀態管理
├── types/               # TypeScript 類型定義
└── docs/                # 專案文檔
```

## 📝 使用指南

### 1. 填寫應用程式資訊
在生成器頁面輸入您的應用程式基本資訊：
- 應用程式名稱
- 應用程式類別
- 主要功能描述
- 目標使用者群體

### 2. 選擇生成選項
- 語言設定（繁體中文/簡體中文/英文）
- 文案風格（專業/親切/創新）
- 生成範圍（完整/部分欄位）

### 3. 生成與編輯
- 點擊「生成文案」按鈕
- 預覽生成結果
- 直接編輯調整內容
- 一鍵複製到剪貼簿

## 🔧 開發命令

```bash
# 開發模式（使用 Turbopack）
npm run dev

# 建構生產版本
npm run build

# 啟動生產伺服器
npm start

# 程式碼檢查
npm run lint

# 類型檢查
npm run type-check
```

## 📄 API 文檔

### POST /api/generate
生成 App Store 文案

**請求參數：**
```json
{
  "appName": "string",
  "category": "string",
  "features": "string",
  "targetAudience": "string",
  "language": "zh-TW | zh-CN | en",
  "style": "professional | friendly | innovative"
}
```

**回應格式：**
```json
{
  "success": true,
  "data": {
    "title": "string",
    "subtitle": "string",
    "description": "string",
    "keywords": ["string"],
    "whatsNew": "string",
    "promotionalText": "string"
  }
}
```

## 🤝 貢獻指南

我們歡迎所有形式的貢獻！請查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解詳情。

1. Fork 專案
2. 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📜 授權協議

本專案採用 MIT 授權協議 - 詳見 [LICENSE](LICENSE) 檔案

## 🙏 致謝

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Shadcn/ui](https://ui.shadcn.com/) - UI 元件庫
- [OpenAI](https://openai.com/) - GPT-4 API

## 📞 聯絡資訊

- 專案網站：[https://launchcraft.dev](https://launchcraft.dev)
- GitHub：[@yourusername](https://github.com/yourusername)
- Email：contact@launchcraft.dev

---

Built with ❤️ by LaunchCraft Team