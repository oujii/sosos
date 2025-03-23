'use client';

import React from 'react';
import { SystemProvider } from '@/context/SystemContext';
import Desktop from '@/components/Desktop';
import Taskbar from '@/components/Taskbar';

export default function Home() {
  return (
    <SystemProvider>
      <div className="h-screen w-screen overflow-hidden">
        <Desktop />
        <Taskbar />
      </div>
    </SystemProvider>
  );
}
