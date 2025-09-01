/**
 * @file ProjectForm.tsx
 * @description 專案資訊輸入表單元件
 * @author Claude
 * @date 2025-09-01
 * 
 * 收集應用基本資訊的表單，包含驗證和狀態管理
 */

'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { 
  Plus, 
  X, 
  Sparkles,
  Info,
  ChevronRight,
  Target,
  Palette,
  Users,
  DollarSign
} from 'lucide-react'
import {
  projectFormSchema,
  ProjectFormData,
  defaultProjectFormValues,
  categoryOptions,
  brandToneOptions,
  ageRangeOptions,
  interestOptions,
  pricingModelOptions
} from '@/lib/validation/projectSchema'
import useAppStore from '@/stores/appStore'
import { toast } from 'sonner'

interface ProjectFormProps {
  onComplete?: () => void
}

export default function ProjectForm({ onComplete }: ProjectFormProps) {
  const { updateCurrentProject, setCurrentProject } = useAppStore()
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: defaultProjectFormValues
  })

  const onSubmit = (data: ProjectFormData) => {
    try {
      // 建立新專案
      const newProject = {
        id: `project-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...data,
        targetAudience: {
          ...data.targetAudience,
          interests: selectedInterests
        }
      }

      // 更新 Store
      setCurrentProject(newProject)
      
      toast.success('專案資訊已儲存', {
        description: '現在可以開始生成內容了'
      })

      // 觸發完成回調
      if (onComplete) {
        onComplete()
      }
    } catch (error) {
      toast.error('儲存失敗', {
        description: '請檢查輸入內容並重試'
      })
    }
  }

  // 處理核心功能的動態新增/刪除
  const handleAddFunction = () => {
    const currentFunctions = form.getValues('coreFunctions')
    if (currentFunctions.length < 10) {
      form.setValue('coreFunctions', [...currentFunctions, ''])
    }
  }

  const handleRemoveFunction = (index: number) => {
    const currentFunctions = form.getValues('coreFunctions')
    form.setValue('coreFunctions', currentFunctions.filter((_, i) => i !== index))
  }

  // 處理興趣標籤選擇
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest))
    } else if (selectedInterests.length < 5) {
      setSelectedInterests([...selectedInterests, interest])
    }
    form.setValue('targetAudience.interests', selectedInterests)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* 基本資訊區塊 */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">基本資訊</h3>
          </div>

          {/* 應用概念 */}
          <FormField
            control={form.control}
            name="appConcept"
            render={({ field }) => (
              <FormItem>
                <FormLabel>應用概念描述 *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="請描述您的應用主要功能和目標，例如：一個幫助使用者記錄日常飲水量並提供健康建議的應用..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  詳細描述您的應用概念，至少 20 個字
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 核心功能 */}
          <FormField
            control={form.control}
            name="coreFunctions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>核心功能 *</FormLabel>
                <FormDescription>
                  列出應用的主要功能（最多 10 個）
                </FormDescription>
                <div className="space-y-2">
                  {field.value.map((func, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-2"
                    >
                      <Input
                        placeholder={`功能 ${index + 1}`}
                        value={func}
                        onChange={(e) => {
                          const newFunctions = [...field.value]
                          newFunctions[index] = e.target.value
                          field.onChange(newFunctions)
                        }}
                      />
                      {field.value.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveFunction(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </motion.div>
                  ))}
                </div>
                {field.value.length < 10 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddFunction}
                    className="mt-2"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    新增功能
                  </Button>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 應用類別 */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>應用類別 *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="選擇應用類別" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* 品牌與風格 */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">品牌與風格</h3>
          </div>

          {/* 品牌語氣 */}
          <FormField
            control={form.control}
            name="brandTone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>品牌語氣 *</FormLabel>
                <FormDescription>
                  選擇最符合您應用風格的語氣
                </FormDescription>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {brandToneOptions.map((option) => (
                    <Card
                      key={option.value}
                      className={`
                        p-3 cursor-pointer transition-all
                        ${field.value === option.value 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:border-primary/50'}
                      `}
                      onClick={() => field.onChange(option.value)}
                    >
                      <div className="text-sm font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {option.description}
                      </div>
                    </Card>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* 目標受眾 */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">目標受眾</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 年齡範圍 */}
            <FormField
              control={form.control}
              name="targetAudience.ageRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>年齡範圍 *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="選擇目標年齡" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ageRangeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 性別 */}
            <FormField
              control={form.control}
              name="targetAudience.gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>目標性別</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">所有性別</SelectItem>
                      <SelectItem value="male">男性</SelectItem>
                      <SelectItem value="female">女性</SelectItem>
                      <SelectItem value="other">其他</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 興趣標籤 */}
          <FormField
            control={form.control}
            name="targetAudience.interests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>興趣標籤 *</FormLabel>
                <FormDescription>
                  選擇目標用戶的興趣（最多 5 個）
                </FormDescription>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => (
                    <Badge
                      key={interest}
                      variant={selectedInterests.includes(interest) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* 進階選項 */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">進階選項（選填）</h3>
          </div>

          {/* 價格模式 */}
          <FormField
            control={form.control}
            name="pricingModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>價格模式</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {pricingModelOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div>
                          <div>{option.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {option.description}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 獨特賣點 */}
          <FormField
            control={form.control}
            name="uniqueSellingPoints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>獨特賣點</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="描述您的應用與競品的差異化優勢..."
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  說明您的應用有什麼獨特之處
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* 提交按鈕 */}
        <div className="flex justify-between items-center pt-6 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="w-4 h-4" />
            <span>所有帶 * 號的欄位為必填</span>
          </div>
          <Button type="submit" size="lg" className="gap-2">
            儲存並繼續
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Form>
  )
}