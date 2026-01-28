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
    <Container className="mt-4">
      <div className="text-center">
        <h3>Exercise 2: Xử lý đơn hàng (E-Commerce Admin)</h3>
        <Button variant="primary" onClick={handleOpenModal} className="mt-3">
          Xử lý đơn hàng
        </Button>

        <Modal show={isShowModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận xử lý đơn hàng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Bạn có chắc chắn muốn duyệt đơn hàng này để chuyển sang bộ phận kho không?</p>
          </Modal.Body>
          <Modal.Footer>
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
  );
}

export default OrderProcessing;
