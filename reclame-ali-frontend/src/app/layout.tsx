import { Toaster } from '@/components/ui/Toaster';
import { ReactQueryProvider } from '@/providers/react-query-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Reclama Ali',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${inter.variable} antialiased`}>
        <ReactQueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
