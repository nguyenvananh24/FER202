// Exercise 2: Xử lý đơn hàng (E-Commerce Admin)
import React, { useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';

function OrderProcessing() {
  const [isShowModal, setIsShowModal] = useState(false);

  const handleOpenModal = () => {
    setIsShowModal(true);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  const handleConfirm = () => {
    alert('Xử lý đơn hàng thành công!');
    setIsShowModal(false);
  };

  return (
    <div style={{ 
      backgroundColor: '#2c3e50', 
      minHeight: '100vh',
      padding: '50px 20px'
    }}>
      <Container style={{ maxWidth: '600px' }}>
        <div style={{ 
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '30px' }}>
            Exercise 2: Xử lý đơn hàng (E-Commerce Admin)
          </h3>
          <Button 
            variant="primary" 
            onClick={handleOpenModal} 
            size="lg"
            style={{ padding: '12px 40px', fontSize: '1.1rem' }}
          >
            Xử lý đơn hàng
          </Button>

          <Modal show={isShowModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton style={{ backgroundColor: '#f8f9fa' }}>
              <Modal.Title style={{ color: '#2c3e50' }}>Xác nhận xử lý đơn hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: '30px', fontSize: '1.05rem', color: '#555' }}>
              <p>Bạn có chắc chắn muốn duyệt đơn hàng này để chuyển sang bộ phận kho không?</p>
            </Modal.Body>
            <Modal.Footer style={{ padding: '15px 20px' }}>
              <Button variant="secondary" onClick={handleCloseModal}>
                Hủy
              </Button>
              <Button variant="primary" onClick={handleConfirm}>
                Xác nhận
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Container>
    </div>
  );
}

export default OrderProcessing;
