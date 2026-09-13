import React from 'react';
import { Card } from '@presentation/components/Card';
import { useDashboardPage } from './useDashboardPage';
import './DashboardPage.css';

export const DashboardPage: React.FC = () => {
  const { user, stats } = useDashboardPage();

  return (
    <div className="dashboard-container">
      <div className="dashboard-hero">
        <h1 className="dashboard-hero-title">
          Welcome, {user?.fullName || 'User'}! 👋
        </h1>
        <p className="dashboard-hero-subtitle">
          Overview of your system activity and metrics
        </p>
      </div>

      <div className="dashboard-grid">
        {stats.map((stat, idx) => (
          <Card key={idx} hoverable className="stat-card">
            <Card.Body>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-value">{stat.value}</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};
