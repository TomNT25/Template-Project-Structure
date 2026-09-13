import React from 'react';
import { useDashboardPage } from './useDashboardPage';
import './DashboardPage.css';

export const DashboardPage: React.FC = () => {
  const { user, stats } = useDashboardPage();

  return (
    <div className="dashboard-container">
      <div className="dashboard-hero">
        <h1 className="dashboard-hero-title">
          Welcome, {user?.fullName || 'Developer'}! 👋
        </h1>
        <p className="dashboard-hero-subtitle">
          Hi
        </p>
      </div>

      <div className="dashboard-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
