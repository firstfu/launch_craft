/**
 * @file layout.tsx
 * @description 根版面配置檔案
 * @author Claude
 * @date 2025-09-01
 * 
 * 定義應用程式的全域版面結構和元資料
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/components/providers/session-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LaunchCraft - iOS App Store 上架資料生成器",
  description: "利用 AI 技術快速生成專業的 iOS App Store 上架資料，包含應用名稱、描述、關鍵字等，支援多語言翻譯",
  keywords: ["App Store", "iOS", "上架", "ASO", "AI", "生成器"],
  authors: [{ name: "LaunchCraft Team" }],
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "LaunchCraft - iOS App Store 上架資料生成器",
    description: "利用 AI 技術快速生成專業的 iOS App Store 上架資料",
    type: "website",
    locale: "zh_TW",
    images: [
      {
        url: "/apple-icon.png",
        width: 180,
        height: 180,
        alt: "LaunchCraft Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <SessionProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
