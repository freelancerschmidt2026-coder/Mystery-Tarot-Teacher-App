import React from 'react';
import LunaSidebar from '../Layout/LunaSidebar';
import TopNav from './TopNav';

export default function AppLayout(props: any) {
  const { children } = props || {};

  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-slate-200">
      <LunaSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
