/**
 * @file Footer.tsx
 * @description 應用程式頁尾元件
 * @author Claude
 * @date 2025-09-01
 * 
 * 顯示版權資訊、連結和其他頁尾內容
 */

'use client'

import Link from 'next/link'
import { Github, Twitter, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    產品: [
      { href: '/generator', label: '生成器' },
      { href: '/features', label: '功能特色' },
      { href: '/pricing', label: '價格方案' },
      { href: '/roadmap', label: '產品路線圖' }
    ],
    資源: [
      { href: '/docs', label: '使用文檔' },
      { href: '/blog', label: '部落格' },
      { href: '/api', label: 'API 文檔' },
      { href: '/support', label: '客戶支援' }
    ],
    公司: [
      { href: '/about', label: '關於我們' },
      { href: '/contact', label: '聯絡我們' },
      { href: '/privacy', label: '隱私政策' },
      { href: '/terms', label: '服務條款' }
    ]
  }

  const socialLinks = [
    { href: 'https://github.com', icon: Github, label: 'GitHub' },
    { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
    { href: 'mailto:support@launchcraft.app', icon: Mail, label: 'Email' }
  ]

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">LaunchCraft</h3>
            <p className="text-sm text-muted-foreground">
              利用 AI 力量，快速生成專業的 App Store 上架資料
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={link.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-sm font-semibold">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} LaunchCraft. 保留所有權利。
            </p>
            <p className="text-sm text-muted-foreground flex items-center">
              使用 <Heart className="h-4 w-4 mx-1 text-red-500" /> 製作
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}