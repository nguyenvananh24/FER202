// Exercise 1: Chỉnh sửa số lượng sản phẩm
import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function ProductQuantity() {
  const [quantity, setQuantity] = useState(0);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
    } else if (e.target.value === '') {
      setQuantity(0);
    }
  };

  return (
    <Container className="mt-4">
      <div className="mb-5">
        <h3>Exercise 1: Chỉnh sửa số lượng sản phẩm</h3>
        <Row className="align-items-center mt-3">
          <Col md={3}>
            <div className="d-flex align-items-center gap-2">
              <Button variant="danger" onClick={handleDecrease}>
                -
              </Button>
              <input
                type="number"
                className="form-control text-center"
                style={{ width: '80px' }}
                value={quantity}
                onChange={handleInputChange}
                min="0"
              />
              <Button variant="success" onClick={handleIncrease}>
                +
              </Button>
            </div>
          </Col>
          <Col md={6}>
            <p className="mb-0">Số lượng: {quantity}</p>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default ProductQuantity;
