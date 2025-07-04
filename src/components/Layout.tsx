import React from 'react';
import { Navigation } from './Navigation';
import { Header } from './Header';
import { Breadcrumbs } from './Breadcrumbs';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentUrl?: string;
}

export function Layout({ children, activeTab, onTabChange, currentUrl }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={onTabChange} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentUrl={currentUrl} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6" role="main">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs activeTab={activeTab} />
            <article>
              {children}
            </article>
          </div>
        </main>
      </div>
    </div>
  );
}