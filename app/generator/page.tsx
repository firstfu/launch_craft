/**
 * @file app/generator/page.tsx
 * @description 生成器主頁面 - 應用資訊輸入和文案生成
 * @author Claude
 * @date 2025-09-01
 * 
 * 核心功能頁面，提供應用資訊輸入表單和 AI 生成功能
 */

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Sparkles, 
  FileText, 
  Settings, 
  Eye,
  Download,
  ChevronRight,
  Info
} from 'lucide-react'
import ProjectForm from '@/components/forms/ProjectForm'
import GenerationResults from '@/components/preview/GenerationResults'
import useAppStore from '@/stores/appStore'

export default function GeneratorPage() {
  const [activeTab, setActiveTab] = useState('setup')
  const { currentProject, generationState } = useAppStore()

  const steps = [
    {
      id: 'setup',
      label: '專案設定',
      icon: Settings,
      description: '輸入您的應用基本資訊'
    },
    {
      id: 'generate',
      label: '生成內容',
      icon: Sparkles,
      description: 'AI 智慧生成文案'
    },
    {
      id: 'preview',
      label: '預覽結果',
      icon: Eye,
      description: '查看並編輯生成的內容'
    },
    {
      id: 'export',
      label: '匯出下載',
      icon: Download,
      description: '匯出您的上架資料'
    }
  ]

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const canProceedToGenerate = currentProject && 
    currentProject.appConcept && 
    currentProject.coreFunctions.length > 0

  const canProceedToPreview = currentProject && 
    (currentProject.appName || currentProject.appDescription)

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">App Store 資料生成器</h1>
              <p className="text-muted-foreground">
                輸入應用資訊，AI 為您生成專業的上架文案
              </p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-8 mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      ${activeTab === step.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'}
                    `}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs mt-2 text-center hidden sm:block">
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-[2px] bg-muted mx-2" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="setup">專案設定</TabsTrigger>
            <TabsTrigger 
              value="generate"
              disabled={!canProceedToGenerate}
            >
              生成內容
            </TabsTrigger>
            <TabsTrigger 
              value="preview"
              disabled={!canProceedToPreview}
            >
              預覽結果
            </TabsTrigger>
            <TabsTrigger 
              value="export"
              disabled={!canProceedToPreview}
            >
              匯出下載
            </TabsTrigger>
          </TabsList>

          {/* Setup Tab */}
          <TabsContent value="setup" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>專案基本資訊</CardTitle>
                <CardDescription>
                  請提供您的應用詳細資訊，AI 將根據這些內容生成合適的文案
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectForm onComplete={() => setActiveTab('generate')} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Generate Tab */}
          <TabsContent value="generate" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI 文案生成</CardTitle>
                <CardDescription>
                  選擇要生成的內容類型，AI 將為您創建專業的文案
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Generation Options */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="border-2 hover:border-primary transition-colors cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">應用名稱與副標題</CardTitle>
                          <Badge>必要</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          生成吸引人的應用名稱和描述性副標題
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-2 hover:border-primary transition-colors cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">應用描述</CardTitle>
                          <Badge>必要</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          完整的應用功能介紹和價值主張
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-2 hover:border-primary transition-colors cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">關鍵字優化</CardTitle>
                          <Badge variant="secondary">建議</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          ASO 優化的搜尋關鍵字建議
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-2 hover:border-primary transition-colors cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">宣傳文字</CardTitle>
                          <Badge variant="secondary">建議</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          簡短有力的行銷宣傳語句
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center pt-4">
                    <Button variant="outline" onClick={() => setActiveTab('setup')}>
                      返回設定
                    </Button>
                    <Button 
                      size="lg"
                      className="gap-2"
                      onClick={() => {
                        // TODO: Implement generation logic
                        setActiveTab('preview')
                      }}
                    >
                      <Sparkles className="w-5 h-5" />
                      開始生成全部內容
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview" className="mt-6">
            <GenerationResults />
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="export" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>匯出您的資料</CardTitle>
                <CardDescription>
                  選擇匯出格式，下載您的 App Store 上架資料
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <FileText className="w-8 h-8 mb-2 text-primary" />
                      <CardTitle className="text-lg">JSON 格式</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        結構化資料，易於程式處理
                      </p>
                      <Button className="w-full" variant="outline">
                        下載 JSON
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <FileText className="w-8 h-8 mb-2 text-primary" />
                      <CardTitle className="text-lg">Markdown 格式</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        格式化文檔，方便閱讀編輯
                      </p>
                      <Button className="w-full" variant="outline">
                        下載 Markdown
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <FileText className="w-8 h-8 mb-2 text-primary" />
                      <CardTitle className="text-lg">複製到剪貼板</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        快速複製，直接貼上使用
                      </p>
                      <Button className="w-full" variant="outline">
                        複製全部
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}