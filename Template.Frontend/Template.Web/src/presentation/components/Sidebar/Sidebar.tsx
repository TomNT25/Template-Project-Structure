import React from 'react';
import { useSidebar, type UseSidebarProps } from './useSidebar';
import './Sidebar.css';

export interface SidebarProps extends UseSidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { navItems, handleSelect } = useSidebar({ activeTab, onTabChange });
  const isMock = import.meta.env.VITE_USE_MOCK_DATA === 'true';

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeTab === item.id ? 'sidebar-item-active' : ''}`}
            onClick={() => handleSelect(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-badge">
          <span className="sidebar-status-dot" />
          <span>Mode: {isMock ? 'Mock Server' : 'Live API'}</span>
        </div>
      </div>
    </aside>
  );
};
