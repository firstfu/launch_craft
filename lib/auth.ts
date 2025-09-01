/**
 * @file auth.ts
 * @description NextAuth 統一配置文件
 * @author Claude
 * @date 2025-09-01
 * @version 2.0.0
 */

import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: '電子郵件', type: 'email' },
        password: { label: '密碼', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 測試用戶
        if (credentials.email === 'test@example.com') {
          const passwordMatch = await bcrypt.compare(
            credentials.password as string,
            '$2a$10$k5chFXouPGDh1LJ5KIQgNuBp0JgWj3tGmV9.Kp4nUeVevQ2FqvqhS' // password123
          );
          
          if (passwordMatch) {
            return {
              id: '1',
              email: 'test@example.com',
              name: '測試使用者',
            };
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt' as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

// 為了兼容 API 路由
export const { GET, POST } = handlers;