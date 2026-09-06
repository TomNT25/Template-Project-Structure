import { useTheme } from '@application/context/ThemeContext';
import { useAuth } from '@application/context/AuthContext';

export function useNavbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const userInitial = user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U';

  return {
    theme,
    toggleTheme,
    user,
    userInitial,
    logout,
  };
}
