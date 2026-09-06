import React from 'react';
import { Navbar } from '@presentation/components/Navbar';
import { Sidebar } from '@presentation/components/Sidebar';
import './MainLayout.css';

export interface MainLayoutProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  activeTab,
  onTabChange,
  children,
}) => {
  return (
    <div className="main-layout">
      <Navbar />
      <div className="main-layout-body">
        <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
        <main className="main-layout-content">{children}</main>
      </div>
    </div>
  );
};
