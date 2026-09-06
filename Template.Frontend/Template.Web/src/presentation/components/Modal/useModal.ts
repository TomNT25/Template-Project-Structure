import React, { useEffect, useCallback } from 'react';

export interface UseModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeOnEsc?: boolean;
  closeOnOutsideClick?: boolean;
}

export function useModal({
  isOpen,
  onClose,
  closeOnEsc = true,
  closeOnOutsideClick = true,
}: UseModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape' && isOpen) {
        onClose();
      }
    },
    [closeOnEsc, isOpen, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return {
    handleBackdropClick,
  };
}
