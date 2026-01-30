// Exercise: Điều khiển quy trình duyệt đơn hàng qua Modal với useReducer
import React, { useReducer } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';

const initialState = {
  isShowModal: false,
  isConfirmed: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, isShowModal: true };
    case 'CLOSE_MODAL':
      return { ...state, isShowModal: false };
    case 'CONFIRM_ORDER':
      return { ...state, isConfirmed: true };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function OrderProcessing2() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOpenModal = () => {
    dispatch({ type: 'OPEN_MODAL' });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const handleConfirmOrder = () => {
    dispatch({ type: 'CONFIRM_ORDER' });
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const handleCloseSuccessModal = () => {
    dispatch({ type: 'RESET' });
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
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '40px', textAlign: 'center' }}>
            Exercise: Xử lý đơn hàng (useReducer)
          </h3>

          <div style={{ textAlign: 'center' }}>
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleOpenModal}
              style={{ padding: '12px 40px', fontSize: '1.1rem' }}
            >
              Duyệt đơn hàng
            </Button>
          </div>

          {state.isConfirmed && (
            <div style={{
              marginTop: '30px',
              padding: '20px',
              backgroundColor: '#d4edda',
              border: '1px solid #c3e6cb',
              borderRadius: '8px',
              color: '#155724',
              textAlign: 'center',
              fontSize: '1.1rem'
            }}>
              ✓ Đơn hàng đã được duyệt thành công!
            </div>
          )}
        </div>
      </Container>

      {/* Modal xác nhận */}
      <Modal show={state.isShowModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận duyệt đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ margin: 0, fontSize: '1.05rem' }}>
            Bạn có chắc chắn muốn duyệt đơn hàng này không?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleConfirmOrder}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal thông báo thành công */}
      <Modal show={state.isConfirmed} onHide={handleCloseSuccessModal} centered>
        <Modal.Header closeButton style={{ borderBottom: 'none' }}>
          <Modal.Title style={{ color: '#28a745' }}>Thành công!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center', padding: '30px' }}>
          <div style={{ fontSize: '3rem', color: '#28a745', marginBottom: '20px' }}>
            ✓
          </div>
          <p style={{ margin: 0, fontSize: '1.1rem', color: '#555' }}>
            Đơn hàng đã được duyệt thành công!
          </p>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: 'none', justifyContent: 'center' }}>
          <Button variant="success" onClick={handleCloseSuccessModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default OrderProcessing2;
