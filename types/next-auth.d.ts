/**
 * @file next-auth.d.ts
 * @description NextAuth.js 類型定義擴展
 * @author Claude
 * @date 2025-09-01
 * @version 1.0.0
 */

import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    email: string;
    name: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    name: string;
    provider?: string;
  }
}