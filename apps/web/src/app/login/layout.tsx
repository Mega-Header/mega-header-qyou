import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Log In | mega-header-mega-header-qyou',
  description: 'Log in to your mega-header-mega-header-qyou account',
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
