import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function MessageModal({ show, message, onContinue }) {
  return (
    <Modal show={show} centered backdrop="static" keyboard={false}>
      <Modal.Body className="text-center py-4">
        <div className="mb-3">
          <i className="text-success" style={{ fontSize: '3rem' }}>✓</i>
        </div>
        <p className="fs-5">{message}</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="primary" onClick={onContinue}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MessageModal;
