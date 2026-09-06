export interface NavItem {
  id: string;
  label: string;
  icon: string;
}

export interface UseSidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function useSidebar({ activeTab, onTabChange }: UseSidebarProps) {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'students', label: 'Student Directory', icon: '🎓' },
    { id: 'auth-demo', label: 'Auth Features', icon: '🔐' },
  ];

  const handleSelect = (id: string) => {
    onTabChange(id);
  };

  return {
    navItems,
    activeTab,
    handleSelect,
  };
}
