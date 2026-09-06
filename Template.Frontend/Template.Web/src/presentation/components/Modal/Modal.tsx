import React from 'react';
import { useModal, type UseModalProps } from './useModal';
import './Modal.css';

export interface ModalProps extends UseModalProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  closeOnEsc,
  closeOnOutsideClick,
}) => {
  const { handleBackdropClick } = useModal({ isOpen, onClose, closeOnEsc, closeOnOutsideClick });

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h3 className="modal-title">{title || ''}</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="modal-body">{children}</div>

        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};
