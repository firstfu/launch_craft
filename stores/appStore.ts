/**
 * @file appStore.ts
 * @description 應用程式全域狀態管理 Store
 * @author Claude
 * @date 2025-09-01
 * 
 * 使用 Zustand 管理應用程式的全域狀態，包含專案資料、生成結果等
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * 應用類別枚舉
 */
export enum AppCategory {
  GAMES = 'games',
  BUSINESS = 'business',
  EDUCATION = 'education',
  ENTERTAINMENT = 'entertainment',
  FINANCE = 'finance',
  HEALTH_FITNESS = 'health_fitness',
  LIFESTYLE = 'lifestyle',
  MEDICAL = 'medical',
  MUSIC = 'music',
  NEWS = 'news',
  PHOTO_VIDEO = 'photo_video',
  PRODUCTIVITY = 'productivity',
  REFERENCE = 'reference',
  SHOPPING = 'shopping',
  SOCIAL_NETWORKING = 'social_networking',
  SPORTS = 'sports',
  TRAVEL = 'travel',
  UTILITIES = 'utilities',
  WEATHER = 'weather',
  OTHER = 'other'
}

/**
 * 品牌語氣枚舉
 */
export enum BrandTone {
  PROFESSIONAL = 'professional',
  FRIENDLY = 'friendly',
  PLAYFUL = 'playful',
  INNOVATIVE = 'innovative',
  TRUSTWORTHY = 'trustworthy',
  YOUTHFUL = 'youthful',
  SOPHISTICATED = 'sophisticated',
  CASUAL = 'casual'
}

/**
 * 目標受眾介面
 */
export interface TargetAudience {
  ageRange: string
  gender: 'all' | 'male' | 'female' | 'other'
  interests: string[]
}

/**
 * 專案資料介面
 */
export interface ProjectData {
  // 基本資訊
  id: string
  createdAt: Date
  updatedAt: Date
  
  // 應用資訊
  appConcept: string
  coreFunctions: string[]
  category: AppCategory
  brandTone: BrandTone
  targetAudience: TargetAudience
  
  // 生成結果
  appName?: string
  appSubtitle?: string
  appDescription?: string
  promotionalText?: string
  keywords?: string[]
  whatsNew?: string
  
  // 多語言支援
  translations?: {
    [languageCode: string]: {
      appName?: string
      appSubtitle?: string
      appDescription?: string
      promotionalText?: string
      whatsNew?: string
    }
  }
  
  // 視覺建議
  iconConcepts?: string[]
  screenshotCaptions?: string[]
}

/**
 * 生成狀態介面
 */
export interface GenerationState {
  isGenerating: boolean
  currentStep: string
  progress: number
  error?: string
}

/**
 * Store 狀態介面
 */
interface AppState {
  // 當前專案
  currentProject: ProjectData | null
  
  // 專案列表
  projects: ProjectData[]
  
  // 生成狀態
  generationState: GenerationState
  
  // Actions
  setCurrentProject: (project: ProjectData | null) => void
  updateCurrentProject: (updates: Partial<ProjectData>) => void
  addProject: (project: ProjectData) => void
  deleteProject: (projectId: string) => void
  setGenerationState: (state: Partial<GenerationState>) => void
  resetGenerationState: () => void
  clearAll: () => void
}

/**
 * 建立 Store 實例
 */
const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // 初始狀態
      currentProject: null,
      projects: [],
      generationState: {
        isGenerating: false,
        currentStep: '',
        progress: 0
      },
      
      // Actions
      setCurrentProject: (project) => 
        set({ currentProject: project }),
      
      updateCurrentProject: (updates) =>
        set((state) => ({
          currentProject: state.currentProject 
            ? { ...state.currentProject, ...updates, updatedAt: new Date() }
            : null
        })),
      
      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, project],
          currentProject: project
        })),
      
      deleteProject: (projectId) =>
        set((state) => ({
          projects: state.projects.filter(p => p.id !== projectId),
          currentProject: state.currentProject?.id === projectId 
            ? null 
            : state.currentProject
        })),
      
      setGenerationState: (newState) =>
        set((state) => ({
          generationState: { ...state.generationState, ...newState }
        })),
      
      resetGenerationState: () =>
        set({
          generationState: {
            isGenerating: false,
            currentStep: '',
            progress: 0
          }
        }),
      
      clearAll: () =>
        set({
          currentProject: null,
          projects: [],
          generationState: {
            isGenerating: false,
            currentStep: '',
            progress: 0
          }
        })
    }),
    {
      name: 'launchcraft-storage', // localStorage 的 key
      partialize: (state) => ({
        projects: state.projects,
        currentProject: state.currentProject
      }) // 只持久化專案資料，不持久化生成狀態
    }
  )
)

export default useAppStore