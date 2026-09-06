import React from 'react';
import { useNavbar } from './useNavbar';
import { Button } from '../Button';
import './Navbar.css';

export interface NavbarProps {
  title?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ title = 'Clean Architecture Template' }) => {
  const { theme, toggleTheme, user, userInitial, logout } = useNavbar();

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo">A</div>
        <span>{title}</span>
      </div>

      <div className="navbar-actions">
        <button
          className="navbar-theme-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {user && (
          <div className="navbar-user">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.fullName} className="navbar-avatar" />
            ) : (
              <div className="navbar-avatar">{userInitial}</div>
            )}
            <span className="navbar-username">{user.fullName}</span>
            <Button variant="outline" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
