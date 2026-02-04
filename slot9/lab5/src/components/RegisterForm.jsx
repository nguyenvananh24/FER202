//DangKyForm.csx để thực hiện form đăng ký với các trường: Username, Email, Password sử dụng useReducer để quản lý trạng thái form và hiển thị thông báo lỗi tương ứng.
//Chúng ta sẽ thực hiện 3 bước để tối ưu:
//1.	State Object: Chia làm values (dữ liệu) và errors (thông báo lỗi).
//2.	Helper Function: Một hàm xử lý kiểm tra lỗi riêng biệt để tránh làm "phình" component.
//3.	UI Feedback: Sử dụng thuộc tính isInvalid của React-Bootstrap để giao diện phản ứng tức thì.
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Modal, Toast, ToastContainer } from 'react-bootstrap';

    //B1. Khởi tạo trạng thái form
    const initialState = {
        values: {
            username: '',
            email: '',
            password: ''
        },
        errors: {
            username: '',
            email: '',
            password: ''
        }
    };
    //Bước 2: Hàm reducer để quản lý trạng thái form
    const formReducer = (state, action) => {
        switch (action.type) {
            case 'SET_VALUE':
                return {
                    ...state,
                    values: {
                        ...state.values,
                        [action.field]: action.value
                    },
                    errors: {
                        ...state.errors,
                        [action.field]: ''
                    }
                };
            case 'SET_ERROR':
                return {
                    ...state,
                    errors: {
                        ...state.errors,
                        [action.field]: action.error
                    }
                };
            case 'RESET_FORM':
                return initialState;
            default:
                return state;
        }
    };

function RegisterForm() {
    const [state, dispatch] = React.useReducer(formReducer, initialState);
    const [validated, setValidated] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [registeredData, setRegisteredData] = useState(null);

    // Hàm kiểm tra lỗi cho từng trường
    const validateField = (field, value) => {
        let error = '';
        switch (field) {
            case 'username':
                if (value.trim() === '') {
                    error = 'Username không được để trống';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    error = 'Email không hợp lệ';
                }
                break;
            case 'password':
                if (value.length < 6) {
                    error = 'Password phải có ít nhất 6 ký tự';
                }
                break;
            default:
                break;
        }
        return error;
    };

    // Hàm kiểm tra toàn bộ form
    const validateForm = () => {
        let isValid = true;
        Object.keys(state.values).forEach((field) => {
            const error = validateField(field, state.values[field]);
            if (error) {
                dispatch({ type: 'SET_ERROR', field, error });
                isValid = false;
            }
        });
        return isValid;
    };

    const handleSubmit = (event) => {   
        event.preventDefault();
        if (validateForm()) {
            console.log('Đăng ký thành công:', state.values);
            // Lưu thông tin đã đăng ký
            setRegisteredData({
                username: state.values.username,
                email: state.values.email
            });
            setShowModal(true);
            setShowToast(true);
            dispatch({ type: 'RESET_FORM' });
            setValidated(false);
        } else {
            setValidated(true);
        }   
    };

    // Xử lý sự kiện handleBlur để kiểm tra lỗi ngay khi rời khỏi ô nhập liệu
    const handleBlur = (field) => {
        const error = validateField(field, state.values[field]);
        if (error) {
            dispatch({ type: 'SET_ERROR', field, error });
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                   <Card className="shadow-sm">
                    <Card.Body>
                      <Card.Title className="text-center mb-4">Đăng Ký Tài Khoản</Card.Title>
                      <Form noValidate validated={validated} onSubmit={handleSubmit}>   
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập username"
                                value={state.values.username}
                                isInvalid={!!state.errors.username}
                                onChange={(e) =>
                                    dispatch({ type: 'SET_VALUE', field: 'username', value: e.target.value })
                                }
                                onBlur={() => handleBlur('username')}
                            />
                            <Form.Control.Feedback type="invalid">
                                {state.errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Nhập email"
                                value={state.values.email}
                                isInvalid={!!state.errors.email}
                                onChange={(e) =>
                                    dispatch({ type: 'SET_VALUE', field: 'email', value: e.target.value })}
                                onBlur={() => handleBlur('email')}
                            />
                            <Form.Control.Feedback type="invalid">  
                                {state.errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>   
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>   
                            <Form.Control
                                type="password"
                                placeholder="Nhập password"
                                value={state.values.password}
                                isInvalid={!!state.errors.password}
                                onChange={(e) =>
                                    dispatch({ type: 'SET_VALUE', field: 'password', value: e.target.value })}
                                onBlur={() => handleBlur('password')}
                            />      
                            <Form.Control.Feedback type="invalid">
                                {state.errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Đăng Ký
                        </Button>
                        </Form>
                    </Card.Body>
                   </Card>
                </Col>
            </Row>

            {/* Modal thông báo đăng ký thành công với thông tin đã đăng ký */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo đăng ký thành công</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center mb-3">
                        <h5 className="text-success mb-3">✓ Đăng ký thành công!</h5>
                        <p className="mb-0">Tài khoản của bạn đã được tạo thành công.</p>
                    </div>
                    {registeredData && (
                        <div className="mt-4 p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                            <h6 className="mb-3"><strong>Thông tin đã đăng ký:</strong></h6>
                            <div className="mb-2">
                                <strong>Username:</strong> <span className="text-primary">{registeredData.username}</span>
                            </div>
                            <div className="mb-2">
                                <strong>Email:</strong> <span className="text-primary">{registeredData.email}</span>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowModal(false)}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Toast Message thông báo đăng ký thành công */}
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
                        Đã đăng ký thành công! Chào mừng bạn đến với hệ thống.
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
}

export default RegisterForm;