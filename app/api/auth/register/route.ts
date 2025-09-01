/**
 * @file route.ts
 * @description 使用者註冊 API 路由
 * @author Claude
 * @date 2025-09-01
 * @version 1.0.0
 */

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// 註冊資料驗證 Schema
const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

// 模擬使用者資料庫（實際應使用真實資料庫）
const users: Array<{
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}> = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 驗證輸入資料
    const validatedData = registerSchema.parse(body);
    
    // 檢查郵件是否已存在（實際應查詢資料庫）
    const existingUser = users.find(user => user.email === validatedData.email);
    if (existingUser) {
      return NextResponse.json(
        { error: '此電子郵件已被註冊' },
        { status: 400 }
      );
    }
    
    // 加密密碼
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    
    // 建立新使用者（實際應儲存到資料庫）
    const newUser = {
      id: crypto.randomUUID(),
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
      createdAt: new Date(),
    };
    
    users.push(newUser);
    
    // 回傳成功訊息（不包含密碼）
    return NextResponse.json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
      message: '註冊成功',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '輸入資料無效', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('註冊錯誤:', error);
    return NextResponse.json(
      { error: '註冊失敗，請稍後再試' },
      { status: 500 }
    );
  }
}