import React from 'react';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen md:flex bg-stone-50 text-stone-800 font-sans selection:bg-stone-200 selection:text-stone-900">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 md:p-12 lg:p-16">
          {children}
        </div>
      </main>
    </div>
  );
};
