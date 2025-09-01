/**
 * @file auth.config.ts
 * @description NextAuth 認證配置檔案
 * @author Claude
 * @date 2025-09-01
 * @version 1.0.0
 */

import type { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// 登入驗證 Schema
const loginSchema = z.object({
  email: z.string().email('請輸入有效的電子郵件'),
  password: z.string().min(6, '密碼至少需要 6 個字元'),
});

export const authConfig: AuthOptions = {
  pages: {
    signIn: '/auth/login',
    signUp: '/auth/register',
    error: '/auth/error',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAuthPage = nextUrl.pathname.startsWith('/auth');
      const isOnProtectedPage = nextUrl.pathname.startsWith('/dashboard') || 
                               nextUrl.pathname.startsWith('/projects');

      if (isOnProtectedPage) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isOnAuthPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  providers: [
    // Email/Password 登入
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: '電子郵件', type: 'email' },
        password: { label: '密碼', type: 'password' },
      },
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        // TODO: 從資料庫獲取使用者
        // 這裡先使用模擬資料
        const user = await getUserByEmail(email);

        if (!user || !user.password) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (passwordsMatch) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        }

        return null;
      },
    }),
    // Google OAuth
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    // GitHub OAuth
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// 模擬從資料庫獲取使用者的函數
// TODO: 實作真實的資料庫查詢
async function getUserByEmail(email: string) {
  // 這裡應該查詢真實的資料庫
  // 目前返回模擬資料
  if (email === 'test@example.com') {
    return {
      id: '1',
      email: 'test@example.com',
      name: '測試使用者',
      // 密碼: password123
      password: '$2a$10$k5chFXouPGDh1LJ5KIQgNuBp0JgWj3tGmV9.Kp4nUeVevQ2FqvqhS',
    };
  }
  return null;
}