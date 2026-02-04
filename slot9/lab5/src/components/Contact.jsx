// Contact.jsx - Trang liên hệ với form validation
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Modal, Toast, ToastContainer } from 'react-bootstrap';

function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    city: '',
    state: '',
    zip: '',
    agreeTerms: false
  });

  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    if (form.checkValidity() === false || !formData.agreeTerms) {
      setValidated(true);
      return;
    }

    setValidated(true);
    
    // Lưu thông tin đã submit
    setSubmittedData({
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      city: formData.city,
      state: formData.state,
      zip: formData.zip
    });
    
    setShowModal(true);
    setShowToast(true);
    console.log('Contact Form Data:', formData);

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      username: '',
      city: '',
      state: '',
      zip: '',
      agreeTerms: false
    });
    setValidated(false);
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '900px' }}>
      <h2 className="mb-4">Contact Us</h2>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              name="firstName"
              placeholder="Mark"
              value={formData.firstName}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid first name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              name="lastName"
              placeholder="Otto"
              value={formData.lastName}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid last name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type="text"
              name="zip"
              placeholder="Zip"
              value={formData.zip}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Check
            required
            name="agreeTerms"
            label="Agree to terms and conditions"
            onChange={handleChange}
            checked={formData.agreeTerms}
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>

        <Button type="submit">Submit form</Button>
      </Form>

      {/* Modal thông báo submit thành công với thông tin đã submit */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo gửi thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-3">
            <h5 className="text-success mb-3">✓ Submit thành công!</h5>
            <p className="mb-0">Thông tin của bạn đã được gửi thành công.</p>
          </div>
          {submittedData && (
            <div className="mt-4 p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h6 className="mb-3"><strong>Thông tin đã gửi:</strong></h6>
              <Row className="mb-2">
                <Col xs={5}><strong>First Name:</strong></Col>
                <Col xs={7}><span className="text-primary">{submittedData.firstName}</span></Col>
              </Row>
              <Row className="mb-2">
                <Col xs={5}><strong>Last Name:</strong></Col>
                <Col xs={7}><span className="text-primary">{submittedData.lastName}</span></Col>
              </Row>
              <Row className="mb-2">
                <Col xs={5}><strong>Username:</strong></Col>
                <Col xs={7}><span className="text-primary">{submittedData.username}</span></Col>
              </Row>
              <Row className="mb-2">
                <Col xs={5}><strong>City:</strong></Col>
                <Col xs={7}><span className="text-primary">{submittedData.city}</span></Col>
              </Row>
              <Row className="mb-2">
                <Col xs={5}><strong>State:</strong></Col>
                <Col xs={7}><span className="text-primary">{submittedData.state}</span></Col>
              </Row>
              <Row className="mb-2">
                <Col xs={5}><strong>Zip:</strong></Col>
                <Col xs={7}><span className="text-primary">{submittedData.zip}</span></Col>
              </Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Message thông báo submit thành công */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)} 
          delay={3000} 
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">✓ Thành công</strong>
            <small>vừa xong</small>
          </Toast.Header>
          <Toast.Body className="text-white">
            Submit thành công! Cảm ơn bạn đã liên hệ với chúng tôi.
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default Contact;
