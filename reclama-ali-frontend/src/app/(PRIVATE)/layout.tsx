'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import React from 'react';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO: Substituir por dados reais do usuário e lógica de logout
  const userName = 'Usuário Teste';
  const handleLogout = () => {};

  return (
    <div className="flex flex-col h-screen">
      <Navbar
        appName="Reclame Ali"
        userName={userName}
        onLogout={handleLogout}
      />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar />
        <main className="flex-grow p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
