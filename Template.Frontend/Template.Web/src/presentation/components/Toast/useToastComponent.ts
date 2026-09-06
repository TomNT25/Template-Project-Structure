import { useToast } from '@application/context/ToastContext';

export function useToastComponent() {
  const { toasts, removeToast } = useToast();

  const getToastIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '🔔';
    }
  };

  return {
    toasts,
    removeToast,
    getToastIcon,
  };
}
