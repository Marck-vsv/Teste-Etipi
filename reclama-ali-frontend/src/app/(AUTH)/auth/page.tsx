'use client';

import { SignInForm } from '@/features/auth/components/SignInForm';
import { SignUpForm } from '@/features/auth/components/SignUpForm';
import { AuthTabs } from '@/features/auth/components/AuthTabs';
import { Lock } from 'lucide-react';
import { useState } from 'react';

export default function AuthScreen() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24">
              <Lock />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {activeTab === 'signin' ? 'Bem-vindo de volta!' : 'Olá'}
          </h1>
          <p className="text-gray-600">
            {activeTab === 'signin'
              ? 'Entre na sua conta para continuar'
              : 'Crie sua conta para continuar'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in-up">
          <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === 'signin' ? <SignInForm /> : <SignUpForm />}
        </div>
      </div>
    </div>
  );
}
