// Exercise: Tạo form sản phẩm với useReducer
import React, { useReducer } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

const initialState = {
  name: '',
  price: '',
  category: '',
  isSubmitted: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        [action.field]: action.value,
        isSubmitted: false
      };
    case 'RESET_FORM':
      return initialState;
    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        isSubmitted: true
      };
    default:
      return state;
  }
}

function ProductForm2() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (field, value) => {
    dispatch({ 
      type: 'CHANGE_INPUT', 
      field: field, 
      value: value 
    });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Kiểm tra các trường bắt buộc
    if (!state.name.trim() || !state.price || !state.category) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    
    dispatch({ type: 'SUBMIT_SUCCESS' });
  };

  const isFormValid = state.name.trim() && state.price && state.category;

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
            Exercise: Form sản phẩm (useReducer)
          </h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '600', color: '#2c3e50' }}>
                Tên sản phẩm
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên sản phẩm"
                value={state.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                style={{ padding: '10px', fontSize: '1rem' }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '600', color: '#2c3e50' }}>
                Giá
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập giá sản phẩm"
                value={state.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                style={{ padding: '10px', fontSize: '1rem' }}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: '600', color: '#2c3e50' }}>
                Danh mục
              </Form.Label>
              <Form.Select
                value={state.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                style={{ padding: '10px', fontSize: '1rem' }}
              >
                <option value="">Chọn danh mục</option>
                <option value="Điện tử">Điện tử</option>
                <option value="Thời trang">Thời trang</option>
                <option value="Thực phẩm">Thực phẩm</option>
                <option value="Đồ gia dụng">Đồ gia dụng</option>
              </Form.Select>
            </Form.Group>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <Button 
                variant="primary" 
                type="submit"
                disabled={!isFormValid}
                style={{ 
                  padding: '10px 30px', 
                  fontSize: '1rem',
                  opacity: !isFormValid ? 0.6 : 1,
                  cursor: !isFormValid ? 'not-allowed' : 'pointer'
                }}
              >
                Thêm sản phẩm
              </Button>
              <Button 
                variant="secondary" 
                type="button"
                onClick={handleReset}
                style={{ padding: '10px 30px', fontSize: '1rem' }}
              >
                Reset
              </Button>
            </div>
          </Form>

          {/* Hiển thị thông báo thành công */}
          {state.isSubmitted && (
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
              ✓ Thêm sản phẩm thành công!
            </div>
          )}

          {/* Hiển thị dữ liệu hiện tại */}
          {(state.name || state.price || state.category) && (
            <div style={{
              marginTop: '20px',
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <h5 style={{ color: '#2c3e50', marginBottom: '15px', fontSize: '1rem' }}>
                Thông tin sản phẩm:
              </h5>
              <div style={{ fontSize: '0.95rem', color: '#555' }}>
                <p style={{ margin: '5px 0' }}>
                  <strong>Tên:</strong> {state.name || '(chưa nhập)'}
                </p>
                <p style={{ margin: '5px 0' }}>
                  <strong>Giá:</strong> {state.price || '(chưa nhập)'}
                </p>
                <p style={{ margin: '5px 0' }}>
                  <strong>Danh mục:</strong> {state.category || '(chưa chọn)'}
                </p>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default ProductForm2;
