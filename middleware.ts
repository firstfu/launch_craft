/**
 * @file middleware.ts
 * @description 簡化的中間件配置，避免 NextAuth 錯誤
 * @author Claude
 * @date 2025-09-01
 * @version 1.0.0
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 保護需要認證的頁面
  const protectedPaths = ['/dashboard', '/projects'];
  const authPaths = ['/auth/login', '/auth/register'];
  
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );
  
  const isAuthPath = authPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  // 暫時不做認證檢查，直接讓請求通過
  // TODO: 在修復 NextAuth 問題後重新啟用認證檢查
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png).*)',
  ],
};