/**
 * @file projectSchema.ts
 * @description 專案表單驗證 Schema
 * @author Claude
 * @date 2025-09-01
 * 
 * 使用 Zod 定義專案資訊的驗證規則
 */

import { z } from 'zod'
import { AppCategory, BrandTone } from '@/stores/appStore'

/**
 * 專案表單驗證 Schema
 */
export const projectFormSchema = z.object({
  // 應用概念 - 必填，至少 20 個字
  appConcept: z.string()
    .min(20, '應用概念描述至少需要 20 個字')
    .max(500, '應用概念描述不能超過 500 個字'),
  
  // 核心功能 - 至少需要 1 個功能，最多 10 個
  coreFunctions: z.array(z.string().min(1, '功能描述不能為空'))
    .min(1, '至少需要提供一個核心功能')
    .max(10, '最多可以提供 10 個核心功能'),
  
  // 應用類別 - 必選
  category: z.nativeEnum(AppCategory, {
    errorMap: () => ({ message: '請選擇應用類別' })
  }),
  
  // 品牌語氣 - 必選
  brandTone: z.nativeEnum(BrandTone, {
    errorMap: () => ({ message: '請選擇品牌語氣' })
  }),
  
  // 目標受眾
  targetAudience: z.object({
    // 年齡範圍
    ageRange: z.string().min(1, '請選擇目標年齡範圍'),
    
    // 性別
    gender: z.enum(['all', 'male', 'female', 'other']),
    
    // 興趣標籤
    interests: z.array(z.string())
      .min(1, '至少選擇一個興趣標籤')
      .max(5, '最多可以選擇 5 個興趣標籤')
  }),
  
  // 競品參考（選填）
  competitors: z.array(z.string()).optional(),
  
  // 獨特賣點（選填）
  uniqueSellingPoints: z.string()
    .max(300, '獨特賣點描述不能超過 300 個字')
    .optional(),
  
  // 價格模式（選填）
  pricingModel: z.enum(['free', 'paid', 'freemium', 'subscription']).optional(),
})

/**
 * 專案表單類型
 */
export type ProjectFormData = z.infer<typeof projectFormSchema>

/**
 * 表單預設值
 */
export const defaultProjectFormValues: Partial<ProjectFormData> = {
  appConcept: '',
  coreFunctions: [''],
  category: AppCategory.OTHER,
  brandTone: BrandTone.PROFESSIONAL,
  targetAudience: {
    ageRange: '18-35',
    gender: 'all',
    interests: []
  },
  competitors: [],
  uniqueSellingPoints: '',
  pricingModel: 'free'
}

/**
 * 應用類別選項
 */
export const categoryOptions = [
  { value: AppCategory.GAMES, label: '遊戲' },
  { value: AppCategory.BUSINESS, label: '商業' },
  { value: AppCategory.EDUCATION, label: '教育' },
  { value: AppCategory.ENTERTAINMENT, label: '娛樂' },
  { value: AppCategory.FINANCE, label: '財務' },
  { value: AppCategory.HEALTH_FITNESS, label: '健康與健身' },
  { value: AppCategory.LIFESTYLE, label: '生活風格' },
  { value: AppCategory.MEDICAL, label: '醫療' },
  { value: AppCategory.MUSIC, label: '音樂' },
  { value: AppCategory.NEWS, label: '新聞' },
  { value: AppCategory.PHOTO_VIDEO, label: '照片與影片' },
  { value: AppCategory.PRODUCTIVITY, label: '生產力工具' },
  { value: AppCategory.REFERENCE, label: '參考資料' },
  { value: AppCategory.SHOPPING, label: '購物' },
  { value: AppCategory.SOCIAL_NETWORKING, label: '社交' },
  { value: AppCategory.SPORTS, label: '運動' },
  { value: AppCategory.TRAVEL, label: '旅遊' },
  { value: AppCategory.UTILITIES, label: '工具程式' },
  { value: AppCategory.WEATHER, label: '天氣' },
  { value: AppCategory.OTHER, label: '其他' }
]

/**
 * 品牌語氣選項
 */
export const brandToneOptions = [
  { value: BrandTone.PROFESSIONAL, label: '專業', description: '正式、可靠、權威' },
  { value: BrandTone.FRIENDLY, label: '友善', description: '親切、溫暖、易近' },
  { value: BrandTone.PLAYFUL, label: '活潑', description: '有趣、輕鬆、娛樂' },
  { value: BrandTone.INNOVATIVE, label: '創新', description: '前衛、科技、突破' },
  { value: BrandTone.TRUSTWORTHY, label: '可信', description: '安全、穩定、誠實' },
  { value: BrandTone.YOUTHFUL, label: '年輕', description: '活力、潮流、新鮮' },
  { value: BrandTone.SOPHISTICATED, label: '精緻', description: '優雅、高端、品味' },
  { value: BrandTone.CASUAL, label: '休閒', description: '隨性、自在、日常' }
]

/**
 * 年齡範圍選項
 */
export const ageRangeOptions = [
  { value: '4-12', label: '兒童 (4-12)' },
  { value: '13-17', label: '青少年 (13-17)' },
  { value: '18-24', label: '年輕成人 (18-24)' },
  { value: '25-34', label: '成人 (25-34)' },
  { value: '35-44', label: '中年 (35-44)' },
  { value: '45-54', label: '中高年 (45-54)' },
  { value: '55+', label: '年長者 (55+)' },
  { value: 'all', label: '所有年齡' }
]

/**
 * 興趣標籤選項
 */
export const interestOptions = [
  '科技', '遊戲', '運動', '健身', '音樂',
  '電影', '閱讀', '旅遊', '美食', '攝影',
  '藝術', '時尚', '教育', '商業', '投資',
  '健康', '家庭', '寵物', '環保', '社交'
]

/**
 * 價格模式選項
 */
export const pricingModelOptions = [
  { value: 'free', label: '免費', description: '完全免費使用' },
  { value: 'paid', label: '付費', description: '一次性購買' },
  { value: 'freemium', label: '免費增值', description: '基礎免費，進階付費' },
  { value: 'subscription', label: '訂閱制', description: '週期性付費' }
]