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
          This project is built using <strong>Clean Architecture</strong> with modular triplet files (
          <code>.tsx</code> presentation, <code>.ts</code> custom hook logic, and <code>.css</code> styles).
          Fork or inject this template into any new project for scalable frontend development.
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

      <div className="arch-guide-card">
        <h2 className="arch-guide-title">Architecture Layer Breakdown</h2>
        <div className="arch-layers">
          <div className="arch-layer-box">
            <div className="arch-layer-header">1. Domain (`src/domain`)</div>
            <div className="arch-layer-desc">
              Pure TypeScript contracts, DTOs, BaseAPIResponse&lt;T&gt;, and entity models. Zero framework dependencies.
            </div>
          </div>
          <div className="arch-layer-box">
            <div className="arch-layer-header">2. Infrastructure (`src/infrastructure`)</div>
            <div className="arch-layer-desc">
              HTTP fetch client, Bearer token interceptor, LocalStorage adapters, API callers & Mock fallbacks.
            </div>
          </div>
          <div className="arch-layer-box">
            <div className="arch-layer-header">3. Application (`src/application`)</div>
            <div className="arch-layer-desc">
              AuthContext, ThemeContext, ToastContext, global application hooks, and business use-case handlers.
            </div>
          </div>
          <div className="arch-layer-box">
            <div className="arch-layer-header">4. Presentation (`src/presentation`)</div>
            <div className="arch-layer-desc">
              Clean component triplets (.tsx view, use[Name].ts hook, .css styles) for UI elements, layouts, and pages.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
