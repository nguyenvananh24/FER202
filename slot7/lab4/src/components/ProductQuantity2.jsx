// Exercise: Quản lý số lượng sản phẩm với useReducer
import React, { useReducer } from 'react';
import { Button, Container } from 'react-bootstrap';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count > 0 ? state.count - 1 : 0 };
    case 'SET_INPUT':
      const value = parseInt(action.payload);
      return { count: !isNaN(value) && value >= 0 ? value : 0 };
    default:
      return state;
  }
}

function ProductQuantity2() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const handleInputChange = (e) => {
    dispatch({ type: 'SET_INPUT', payload: e.target.value });
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
            Exercise: Quản lý số lượng sản phẩm (useReducer)
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
              onClick={() => dispatch({ type: 'DECREMENT' })}
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
              value={state.count}
              onChange={handleInputChange}
              min="0"
            />
            <Button
              variant="success"
              onClick={() => dispatch({ type: 'INCREMENT' })}
              size="lg"
              style={{ width: '50px', height: '50px', fontSize: '1.5rem' }}
            >
              +
            </Button>
          </div>

          <p style={{ fontSize: '1.2rem', color: '#555', margin: 0, textAlign: 'center' }}>
            Số lượng: <strong style={{ color: '#2c3e50' }}>{state.count}</strong>
          </p>
        </div>
      </Container>
    </div>
  );
}

export default ProductQuantity2;
