import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@presentation/components/Button';
import './NotFoundPage.css';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Page Not Found</h2>
        <p className="not-found-desc">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button variant="primary" onClick={() => navigate('/dashboard')} icon="🏠">
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};
