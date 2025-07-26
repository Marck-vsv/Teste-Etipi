'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Carregando sessão...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar
        appName='Reclame Ali'
        userName={user?.name || 'Usuário'}
        onLogout={logout}
      />
      <div className='flex flex-grow overflow-hidden'>
        <Sidebar />
        <main className='flex-grow p-6 overflow-y-auto'>
          {children}
        </main>
      </div>
    </div>
  );
}
