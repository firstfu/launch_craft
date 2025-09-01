/**
 * @file auth-simple.ts
 * @description 簡化的 NextAuth 配置（暫時解決方案）
 * @author Claude
 * @date 2025-09-01
 * @version 1.0.0
 */

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
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
    signUp: '/auth/register',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
});