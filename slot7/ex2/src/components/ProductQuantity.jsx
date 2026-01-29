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
            Exercise 1: Chỉnh sửa số lượng sản phẩm
          </h3>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '20px',
            marginBottom: '30px'
          }}>
            <Button 
              variant="danger" 
              onClick={handleDecrease}
              size="lg"
              style={{ width: '50px', height: '50px', fontSize: '1.5rem' }}
            >
              -
            </Button>
            <input
              type="number"
              style={{ 
                width: '100px', 
                height: '50px',
                textAlign: 'center',
                fontSize: '1.3rem',
                border: '2px solid #dee2e6',
                borderRadius: '5px'
              }}
              value={quantity}
              onChange={handleInputChange}
              min="0"
            />
            <Button 
              variant="success" 
              onClick={handleIncrease}
              size="lg"
              style={{ width: '50px', height: '50px', fontSize: '1.5rem' }}
            >
              +
            </Button>
          </div>
          
          <p style={{ fontSize: '1.2rem', color: '#555', margin: 0, textAlign: 'center' }}>
            Số lượng: <strong style={{ color: '#2c3e50' }}>{quantity}</strong>
          </p>
        </div>
      </Container>
    </div>
  );
}

export default ProductQuantity;
