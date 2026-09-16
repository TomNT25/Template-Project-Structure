import { useAuth } from '@application/context/AuthContext';

export function useDashboardPage() {
  const { user } = useAuth();

  const stats = [
    { label: 'Active Students', value: '1,248', icon: '🎓' },
    { label: 'Registered Users', value: '432', icon: '👥' },
    { label: 'Component Triplets', value: '100% TSX/TS/CSS', icon: '🧩' },
  ];

  return {
    user,
    stats,
  };
}
