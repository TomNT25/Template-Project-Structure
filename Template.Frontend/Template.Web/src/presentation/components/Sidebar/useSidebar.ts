import { useLocation } from 'react-router-dom';

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

export function useSidebar() {
  const location = useLocation();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { id: 'students', label: 'Student Directory', icon: '🎓', path: '/students' },
  ];

  const currentPath = location.pathname;

  return {
    navItems,
    currentPath,
  };
}
