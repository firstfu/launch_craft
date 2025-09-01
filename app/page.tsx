/**
 * @file page.tsx
 * @description 首頁元件
 * @author Claude
 * @date 2025-09-01
 * 
 * LaunchCraft 的首頁，展示產品特色和引導用戶開始使用
 */

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles, 
  Zap, 
  Globe, 
  Shield, 
  ArrowRight,
  CheckCircle,
  Rocket,
  Brain,
  Languages,
  Download
} from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: Brain,
      title: 'AI 智慧生成',
      description: '利用 GPT-4 強大的語言能力，根據您的應用概念自動生成吸引人的文案'
    },
    {
      icon: Languages,
      title: '多語言支援',
      description: '一鍵翻譯成多種語言，輕鬆進軍全球市場'
    },
    {
      icon: Zap,
      title: '快速高效',
      description: '幾分鐘內完成原本需要數小時的文案撰寫工作'
    },
    {
      icon: Shield,
      title: 'ASO 優化',
      description: '智慧關鍵字建議，提升您的應用在 App Store 的可見度'
    }
  ]

  const benefits = [
    '節省 90% 的文案撰寫時間',
    '提升 App Store 轉換率',
    '支援 10+ 種語言',
    '專業的文案品質',
    '符合 Apple 規範',
    'SEO/ASO 最佳化'
  ]

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <Badge variant="secondary" className="px-4 py-1">
                <Sparkles className="w-4 h-4 mr-2" />
                AI 驅動的智慧工具
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                iOS App Store 上架
                <br />
                資料快速生成器
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl">
                利用 AI 技術，在幾分鐘內生成專業的 App Store 上架資料。
                從應用名稱到描述文案，一站式解決您的上架需求。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" asChild className="group">
                <Link href="/generator">
                  <Rocket className="w-5 h-5 mr-2" />
                  立即開始生成
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/demo">
                  觀看示範
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-8 mt-12"
            >
              <div className="text-center">
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-sm text-muted-foreground">活躍用戶</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm text-muted-foreground">生成文案</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm text-muted-foreground">支援語言</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">強大功能，簡單易用</h2>
            <p className="text-muted-foreground">
              專為 iOS 開發者設計的智慧工具
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">
                為什麼選擇 LaunchCraft？
              </h2>
              <p className="text-muted-foreground">
                我們了解開發者在上架應用時面臨的挑戰。LaunchCraft 提供完整的解決方案，
                讓您專注於產品開發，而不是花費大量時間在文案撰寫上。
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" asChild>
                <Link href="/generator">
                  免費試用
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Globe className="w-32 h-32 text-primary mx-auto" />
                  <p className="text-lg font-semibold">全球化您的應用</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">
              準備好加速您的上架流程了嗎？
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              加入數千名開發者的行列，使用 LaunchCraft 輕鬆完成 App Store 上架
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/generator">
                  <Rocket className="w-5 h-5 mr-2" />
                  立即開始
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">
                  查看價格方案
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
