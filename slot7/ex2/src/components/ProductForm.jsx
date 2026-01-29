import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

function ProductForm() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: ''
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.price && form.category) {
      setSubmittedData(form);
    }
  };

  const handleReset = () => {
    setForm({
      name: '',
      price: '',
      category: ''
    });
    setSubmittedData(null);
  };

  return (
    <div style={{ 
      backgroundColor: '#2c3e50', 
      minHeight: '100vh',
      padding: '50px 20px'
    }}>
      <Container style={{ maxWidth: '700px' }}>
        <Card style={{ 
          backgroundColor: 'white',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}>
          <Card.Body className="p-4">
            <h3 style={{ 
              textAlign: 'center',
              marginBottom: '30px',
              color: '#2c3e50'
            }}>
              Exercise 3: Form quản lý sản phẩm
            </h3>
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Tên sản phẩm</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nhập tên sản phẩm"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Giá (VNĐ)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Nhập giá sản phẩm"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Danh mục</Form.Label>
                <Form.Select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Chọn danh mục --</option>
                  <option value="Điện thoại">Điện thoại</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Tablet">Tablet</option>
                  <option value="Phụ kiện">Phụ kiện</option>
                </Form.Select>
              </Form.Group>

              <div className="d-flex gap-2">
                <Button variant="primary" type="submit" className="flex-fill">
                  Thêm sản phẩm
                </Button>
                <Button variant="secondary" onClick={handleReset} className="flex-fill">
                  Làm mới
                </Button>
              </div>
            </Form>

            {submittedData && (
              <Alert variant="success" className="mt-4 mb-0">
                <Alert.Heading>✅ Thêm sản phẩm thành công!</Alert.Heading>
                <hr />
                <p className="mb-1"><strong>Tên:</strong> {submittedData.name}</p>
                <p className="mb-1"><strong>Giá:</strong> {parseInt(submittedData.price).toLocaleString('vi-VN')} VNĐ</p>
                <p className="mb-0"><strong>Danh mục:</strong> {submittedData.category}</p>
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default ProductForm;