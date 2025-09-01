/**
 * @file app/api/generate/route.ts
 * @description OpenAI API 整合路由 - 處理所有文案生成請求
 * @author Claude
 * @date 2025-09-01
 * 
 * 統一的 API 端點，根據不同的生成類型調用相應的 prompt
 */

import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// 初始化 OpenAI 客戶端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

/**
 * 生成類型枚舉
 */
export enum GenerationType {
  APP_NAME = 'app_name',
  APP_DESCRIPTION = 'app_description',
  KEYWORDS = 'keywords',
  PROMOTIONAL_TEXT = 'promotional_text',
  WHATS_NEW = 'whats_new',
  ALL = 'all'
}

/**
 * 請求體介面
 */
interface GenerateRequest {
  type: GenerationType
  projectData: {
    appConcept: string
    coreFunctions: string[]
    category: string
    brandTone: string
    targetAudience: {
      ageRange: string
      gender: string
      interests: string[]
    }
    uniqueSellingPoints?: string
    pricingModel?: string
  }
}

/**
 * 構建系統提示詞
 */
function buildSystemPrompt(): string {
  return `你是一位專業的 iOS App Store 上架文案專家，擁有豐富的 ASO (App Store Optimization) 經驗。
你的任務是根據用戶提供的應用資訊，生成吸引人且符合 Apple 規範的上架文案。

請遵循以下原則：
1. 文案要簡潔有力，突出應用的核心價值
2. 使用積極正面的語言，避免負面詞彙
3. 符合目標受眾的語言風格和偏好
4. 包含相關的關鍵字以提升搜尋排名
5. 遵守 Apple App Store 的內容指南
6. 使用繁體中文回應

請根據提供的品牌語氣調整文案風格：
- professional: 專業、正式、可靠
- friendly: 親切、溫暖、易近
- playful: 活潑、有趣、輕鬆
- innovative: 創新、前衛、科技感
- trustworthy: 可信、安全、穩定
- youthful: 年輕、活力、潮流
- sophisticated: 精緻、優雅、高端
- casual: 休閒、自在、日常`
}

/**
 * 構建用戶提示詞
 */
function buildUserPrompt(type: GenerationType, projectData: any): string {
  const baseInfo = `
應用概念：${projectData.appConcept}
核心功能：${projectData.coreFunctions.join('、')}
應用類別：${projectData.category}
品牌語氣：${projectData.brandTone}
目標受眾：${projectData.targetAudience.ageRange} 歲，${projectData.targetAudience.gender === 'all' ? '所有性別' : projectData.targetAudience.gender}
興趣標籤：${projectData.targetAudience.interests.join('、')}
${projectData.uniqueSellingPoints ? `獨特賣點：${projectData.uniqueSellingPoints}` : ''}
${projectData.pricingModel ? `價格模式：${projectData.pricingModel}` : ''}
`

  switch (type) {
    case GenerationType.APP_NAME:
      return `${baseInfo}
請生成 5 個應用名稱選項，每個名稱：
- 不超過 30 個字元
- 簡潔易記
- 體現應用核心功能
- 符合品牌調性

請以 JSON 格式返回：
{
  "names": ["名稱1", "名稱2", "名稱3", "名稱4", "名稱5"],
  "subtitle": "一個描述性的副標題（30字元內）"
}`

    case GenerationType.APP_DESCRIPTION:
      return `${baseInfo}
請生成一份完整的應用描述（1000-2000字），包含：
1. 開場介紹（吸引注意力）
2. 核心功能詳述（條列式）
3. 使用場景說明
4. 用戶價值和好處
5. 呼籲行動

請以 JSON 格式返回：
{
  "description": "完整的應用描述",
  "highlights": ["亮點1", "亮點2", "亮點3"]
}`

    case GenerationType.KEYWORDS:
      return `${baseInfo}
請生成 ASO 優化的關鍵字列表：
- 總長度不超過 100 個字元
- 包含高搜尋量關鍵字
- 涵蓋應用的各個功能面向
- 避免重複和品牌名稱

請以 JSON 格式返回：
{
  "keywords": ["關鍵字1", "關鍵字2", ...],
  "totalLength": 總字元數
}`

    case GenerationType.PROMOTIONAL_TEXT:
      return `${baseInfo}
請生成 3 個宣傳文字選項，每個：
- 不超過 170 個字元
- 突出應用最大賣點
- 包含行動呼籲
- 吸引目標用戶

請以 JSON 格式返回：
{
  "texts": ["文字1", "文字2", "文字3"]
}`

    case GenerationType.ALL:
      return `${baseInfo}
請生成完整的 App Store 上架文案套組，包含：
1. 應用名稱（30字元內）
2. 副標題（30字元內）
3. 應用描述（1000-2000字）
4. 宣傳文字（170字元內）
5. 關鍵字列表（總計100字元內）

請以 JSON 格式返回：
{
  "appName": "應用名稱",
  "subtitle": "副標題",
  "description": "完整描述",
  "promotionalText": "宣傳文字",
  "keywords": ["關鍵字1", "關鍵字2", ...]
}`

    default:
      return baseInfo
  }
}

/**
 * POST 請求處理器
 */
export async function POST(request: NextRequest) {
  try {
    // 檢查 API 金鑰
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: '未設定 OpenAI API 金鑰' },
        { status: 500 }
      )
    }

    // 解析請求體
    const body: GenerateRequest = await request.json()
    const { type, projectData } = body

    // 驗證必要欄位
    if (!type || !projectData) {
      return NextResponse.json(
        { error: '缺少必要參數' },
        { status: 400 }
      )
    }

    // 構建提示詞
    const systemPrompt = buildSystemPrompt()
    const userPrompt = buildUserPrompt(type, projectData)

    // 調用 OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    })

    // 解析回應
    const responseText = completion.choices[0]?.message?.content
    if (!responseText) {
      throw new Error('未收到有效回應')
    }

    const generatedContent = JSON.parse(responseText)

    // 返回結果
    return NextResponse.json({
      success: true,
      type,
      data: generatedContent,
      usage: completion.usage
    })

  } catch (error) {
    console.error('生成失敗:', error)
    
    // 判斷錯誤類型
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { 
          error: '生成失敗',
          message: error.message,
          code: error.status 
        },
        { status: error.status || 500 }
      )
    }

    return NextResponse.json(
      { 
        error: '生成過程發生錯誤',
        message: error instanceof Error ? error.message : '未知錯誤'
      },
      { status: 500 }
    )
  }
}

/**
 * OPTIONS 請求處理器（CORS）
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}