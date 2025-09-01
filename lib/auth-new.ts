/**
 * @file auth-new.ts
 * @description 完全重新設計的 NextAuth 配置
 * @author Claude
 * @date 2025-09-01
 * @version 1.0.0
 */

import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 測試用戶
        if (credentials.email === 'test@example.com') {
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            '$2a$10$k5chFXouPGDh1LJ5KIQgNuBp0JgWj3tGmV9.Kp4nUeVevQ2FqvqhS'
          );

          if (isValidPassword) {
            return {
              id: '1',
              email: 'test@example.com',
              name: '測試使用者',
            };
          }
        }

        return null;
      }
    })
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
    }
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-dev',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export default NextAuth(authOptions);