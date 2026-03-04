import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

function ToastMessage({ show, message, variant = 'success', onClose }) {
  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
      <Toast show={show} onClose={onClose} delay={3000} autohide bg={variant}>
        <Toast.Header>
          <strong className="me-auto">
            {variant === 'success' ? '✓ Success' : '⚠ Warning'}
          </strong>
        </Toast.Header>
        <Toast.Body className={variant === 'success' ? 'text-white' : ''}>
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastMessage;
