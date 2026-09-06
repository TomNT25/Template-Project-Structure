import { useState } from 'react';

export function useMainLayout() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  return {
    activeTab,
    setActiveTab,
  };
}
