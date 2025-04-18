import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const LogoutModal = ({ show, onClose, onLogout }) => {
  return (
    <Modal show={show} onHide={onClose} backdrop="static" animation={true}>
      <Modal.Header>
        <Modal.Title>Akan Logout?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Pilih "Logout" Untuk Mengakhiri Sesi.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={onLogout}>Logout</Button>
      </Modal.Footer>
    </Modal>
  );
};


export default LogoutModal;
