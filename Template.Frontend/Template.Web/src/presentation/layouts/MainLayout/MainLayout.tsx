import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@presentation/components/Navbar';
import { Sidebar } from '@presentation/components/Sidebar';
import './MainLayout.css';

export interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <Navbar />
      <div className="main-layout-body">
        <Sidebar />
        <main className="main-layout-content">{children || <Outlet />}</main>
      </div>
    </div>
  );
};
