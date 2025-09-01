/**
 * @file session-provider.tsx
 * @description NextAuth Session Provider 元件
 * @author Claude
 * @date 2025-09-01
 * @version 1.0.0
 */

'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider>
      {children}
    </NextAuthSessionProvider>
  );
}