/**
 * @file GenerationResults.tsx
 * @description 生成結果預覽元件
 * @author Claude
 * @date 2025-09-01
 * 
 * 展示 AI 生成的應用資料，提供編輯和複製功能
 */

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Copy,
  Edit,
  Save,
  X,
  Check,
  Smartphone,
  Globe,
  Tag,
  FileText,
  Sparkles,
  RefreshCw
} from 'lucide-react'
import useAppStore from '@/stores/appStore'
import { toast } from 'sonner'

export default function GenerationResults() {
  const { currentProject, generationState } = useAppStore()
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<Record<string, string>>({})

  // 模擬生成的資料（實際應從 Store 或 API 獲取）
  const mockGeneratedData = {
    appName: 'HydroTrack Pro',
    appSubtitle: '智慧飲水提醒與健康追蹤',
    appDescription: `HydroTrack Pro 是您的個人飲水健康管家，透過智慧提醒和數據分析，幫助您養成健康的飲水習慣。

主要功能：
• 智慧飲水提醒 - 根據您的身體數據和活動量，個性化設定飲水目標和提醒時間
• 即時追蹤記錄 - 簡單直觀的介面，一鍵記錄每次飲水量
• 健康數據分析 - 視覺化圖表展示飲水趨勢，追蹤健康改善
• 個人化建議 - 基於您的飲水模式，提供專業的健康建議
• 社交挑戰 - 與朋友一起參加飲水挑戰，互相激勵

為什麼選擇 HydroTrack Pro？
我們深知保持充足水分對健康的重要性。HydroTrack Pro 不僅是一個簡單的飲水記錄工具，更是您的健康生活夥伴。透過科學的算法和友善的介面設計，讓飲水變成一種享受而非負擔。

立即下載 HydroTrack Pro，開始您的健康飲水之旅！`,
    promotionalText: '每一滴水都是健康的承諾 - 讓 HydroTrack Pro 成為您的智慧飲水夥伴，科學補水，活力每一天！',
    keywords: ['飲水提醒', '健康追蹤', '水分補充', '健康管理', '智慧提醒', '飲水記錄', '健康生活', '習慣養成'],
    whatsNew: `版本 2.0 重大更新：
• 全新 UI 設計，更加簡潔美觀
• 新增 Apple Watch 支援
• 優化提醒算法，更精準的飲水建議
• 修復已知問題，提升穩定性`
  }

  // 處理複製功能
  const handleCopy = (content: string, fieldName: string) => {
    navigator.clipboard.writeText(content)
    toast.success(`已複製${fieldName}到剪貼板`)
  }

  // 處理編輯功能
  const handleEdit = (field: string, value: string) => {
    setEditingField(field)
    setEditValues({ ...editValues, [field]: value })
  }

  // 處理儲存編輯
  const handleSave = (field: string) => {
    // TODO: 更新到 Store
    toast.success('已儲存變更')
    setEditingField(null)
  }

  // 處理取消編輯
  const handleCancel = () => {
    setEditingField(null)
    setEditValues({})
  }

  // 如果正在生成中，顯示載入狀態
  if (generationState.isGenerating) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 animate-pulse" />
            正在生成內容...
          </CardTitle>
          <CardDescription>
            AI 正在根據您的專案資訊生成最佳文案
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* 頂部操作欄 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>生成結果預覽</CardTitle>
              <CardDescription>
                檢視並編輯 AI 生成的內容，點擊編輯按鈕可修改
              </CardDescription>
            </div>
            <Button variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              重新生成
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* 內容預覽 Tabs */}
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">基本資訊</TabsTrigger>
          <TabsTrigger value="description">詳細描述</TabsTrigger>
          <TabsTrigger value="keywords">關鍵字</TabsTrigger>
          <TabsTrigger value="preview">模擬預覽</TabsTrigger>
        </TabsList>

        {/* 基本資訊 */}
        <TabsContent value="basic" className="space-y-4">
          {/* 應用名稱 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  <CardTitle className="text-base">應用名稱</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    最多 30 字元
                  </Badge>
                </div>
                <div className="flex gap-2">
                  {editingField === 'appName' ? (
                    <>
                      <Button size="sm" variant="ghost" onClick={() => handleSave('appName')}>
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={handleCancel}>
                        <X className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit('appName', mockGeneratedData.appName)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(mockGeneratedData.appName, '應用名稱')}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {editingField === 'appName' ? (
                <Input
                  value={editValues.appName}
                  onChange={(e) => setEditValues({ ...editValues, appName: e.target.value })}
                  maxLength={30}
                />
              ) : (
                <p className="text-lg font-medium">{mockGeneratedData.appName}</p>
              )}
            </CardContent>
          </Card>

          {/* 副標題 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <CardTitle className="text-base">副標題</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    最多 30 字元
                  </Badge>
                </div>
                <div className="flex gap-2">
                  {editingField === 'appSubtitle' ? (
                    <>
                      <Button size="sm" variant="ghost" onClick={() => handleSave('appSubtitle')}>
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={handleCancel}>
                        <X className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit('appSubtitle', mockGeneratedData.appSubtitle)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(mockGeneratedData.appSubtitle, '副標題')}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {editingField === 'appSubtitle' ? (
                <Input
                  value={editValues.appSubtitle}
                  onChange={(e) => setEditValues({ ...editValues, appSubtitle: e.target.value })}
                  maxLength={30}
                />
              ) : (
                <p className="text-muted-foreground">{mockGeneratedData.appSubtitle}</p>
              )}
            </CardContent>
          </Card>

          {/* 宣傳文字 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <CardTitle className="text-base">宣傳文字</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    最多 170 字元
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopy(mockGeneratedData.promotionalText, '宣傳文字')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{mockGeneratedData.promotionalText}</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 詳細描述 */}
        <TabsContent value="description" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <CardTitle className="text-base">應用描述</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    最多 4000 字元
                  </Badge>
                </div>
                <div className="flex gap-2">
                  {editingField === 'appDescription' ? (
                    <>
                      <Button size="sm" variant="ghost" onClick={() => handleSave('appDescription')}>
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={handleCancel}>
                        <X className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit('appDescription', mockGeneratedData.appDescription)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(mockGeneratedData.appDescription, '應用描述')}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {editingField === 'appDescription' ? (
                <Textarea
                  value={editValues.appDescription}
                  onChange={(e) => setEditValues({ ...editValues, appDescription: e.target.value })}
                  className="min-h-[400px] font-mono text-sm"
                  maxLength={4000}
                />
              ) : (
                <div className="whitespace-pre-wrap text-sm">{mockGeneratedData.appDescription}</div>
              )}
            </CardContent>
          </Card>

          {/* 新功能說明 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">新功能說明</CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleCopy(mockGeneratedData.whatsNew, '新功能說明')}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap text-sm">{mockGeneratedData.whatsNew}</div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 關鍵字 */}
        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <CardTitle className="text-base">搜尋關鍵字</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    最多 100 字元
                  </Badge>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleCopy(mockGeneratedData.keywords.join(', '), '關鍵字')}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mockGeneratedData.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                總字元數：{mockGeneratedData.keywords.join(', ').length} / 100
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 模擬預覽 */}
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>App Store 頁面預覽</CardTitle>
              <CardDescription>
                模擬實際在 App Store 中的顯示效果
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-md mx-auto p-6 bg-gradient-to-b from-background to-muted/20 rounded-lg">
                {/* App Icon 預留位置 */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <Smartphone className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{mockGeneratedData.appName}</h3>
                    <p className="text-sm text-muted-foreground">{mockGeneratedData.appSubtitle}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">4.8 ⭐</Badge>
                      <span className="text-xs text-muted-foreground">#3 健康與健身</span>
                    </div>
                  </div>
                </div>

                {/* 操作按鈕 */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <Button className="w-full" size="sm">取得</Button>
                  <Button variant="outline" className="w-full" size="sm">分享</Button>
                </div>

                {/* 螢幕截圖預留位置 */}
                <div className="flex gap-2 mb-6 overflow-x-auto">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-32 h-56 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center"
                    >
                      <Smartphone className="w-8 h-8 text-muted-foreground" />
                    </div>
                  ))}
                </div>

                {/* 描述預覽 */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">關於此 App</h4>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {mockGeneratedData.appDescription}
                  </p>
                  <Button variant="link" className="p-0 h-auto text-sm">
                    更多
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}