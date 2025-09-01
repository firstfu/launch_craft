/**
 * @file middleware.ts
 * @description NextAuth 中介軟體配置
 * @author Claude
 * @date 2025-09-01
 * @version 1.0.0
 */

import { auth } from '@/lib/auth';

export default auth;

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png).*)',
  ],
};