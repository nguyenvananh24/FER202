import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Contact form submitted:', formData);
        alert('Thank you for contacting us! We will get back to you soon.');
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
    };

    const heroStyle = {
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/images/7.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '100px 0',
        color: 'white',
        textAlign: 'center',
        marginBottom: '50px'
    };

    const contactCardStyle = {
        border: 'none',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        padding: '30px',
        height: '100%',
        transition: 'transform 0.3s ease',
        cursor: 'pointer'
    };

    const inputStyle = {
        padding: '12px',
        borderRadius: '5px',
        border: '1px solid #ddd'
    };

    return (
        <div>
            <Header />
            
            {/* Hero Section */}
            <div style={heroStyle}>
                <Container>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '20px', fontFamily: "'Times New Roman', Times, serif" }}>
                        Contact Us
                    </h1>
                    <p style={{ fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto' }}>
                        We'd love to hear from you. Get in touch with us today!
                    </p>
                </Container>
            </div>

            {/* Contact Info Section */}
            <Container style={{ padding: '60px 0' }}>
                <Row className="mb-5">
                    <Col md={4} className="mb-4">
                        <Card style={contactCardStyle} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div className="text-center">
                                <div style={{ fontSize: '3rem', color: '#dc3545', marginBottom: '20px' }}>📍</div>
                                <h4 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Visit Us</h4>
                                <p style={{ color: '#666', lineHeight: '1.6' }}>
                                    123 Pizza Street<br />
                                    New York, NY 10001<br />
                                    United States
                                </p>
                            </div>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card style={contactCardStyle} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div className="text-center">
                                <div style={{ fontSize: '3rem', color: '#dc3545', marginBottom: '20px' }}>📞</div>
                                <h4 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Call Us</h4>
                                <p style={{ color: '#666', lineHeight: '1.6' }}>
                                    Phone: +1 (555) 123-4567<br />
                                    Fax: +1 (555) 123-4568<br />
                                    Hotline: 1-800-PIZZA-HUT
                                </p>
                            </div>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card style={contactCardStyle} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div className="text-center">
                                <div style={{ fontSize: '3rem', color: '#dc3545', marginBottom: '20px' }}>✉️</div>
                                <h4 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Email Us</h4>
                                <p style={{ color: '#666', lineHeight: '1.6' }}>
                                    info@pizzahouse.com<br />
                                    support@pizzahouse.com<br />
                                    orders@pizzahouse.com
                                </p>
                            </div>
                        </Card>
                    </Col>
                </Row>

                {/* Contact Form Section */}
                <Row className="justify-content-center mt-5">
                    <Col lg={8}>
                        <Card style={{ border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', padding: '40px' }}>
                            <h2 style={{ 
                                fontSize: '2.5rem', 
                                textAlign: 'center', 
                                marginBottom: '30px',
                                fontFamily: "'Times New Roman', Times, serif"
                            }}>
                                Send Us a Message
                            </h2>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label style={{ fontWeight: '600' }}>Your Name *</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                placeholder="Enter your name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                style={inputStyle}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label style={{ fontWeight: '600' }}>Your Email *</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                style={inputStyle}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label style={{ fontWeight: '600' }}>Phone Number</Form.Label>
                                            <Form.Control
                                                type="tel"
                                                name="phone"
                                                placeholder="Enter your phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                style={inputStyle}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label style={{ fontWeight: '600' }}>Subject *</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="subject"
                                                placeholder="Enter subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                style={inputStyle}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-4">
                                    <Form.Label style={{ fontWeight: '600' }}>Message *</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        name="message"
                                        placeholder="Write your message here..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        style={inputStyle}
                                    />
                                </Form.Group>
                                <div className="text-center">
                                    <Button 
                                        variant="dark" 
                                        type="submit"
                                        style={{
                                            padding: '12px 50px',
                                            fontSize: '1.1rem',
                                            fontWeight: '600',
                                            backgroundColor: '#2c2c2c',
                                            border: 'none'
                                        }}
                                    >
                                        Send Message
                                    </Button>
                                </div>
                            </Form>
                        </Card>
                    </Col>
                </Row>

                {/* Map Section */}
                <Row className="mt-5">
                    <Col xs={12}>
                        <h2 style={{ 
                            fontSize: '2.5rem', 
                            textAlign: 'center', 
                            marginBottom: '30px',
                            fontFamily: "'Times New Roman', Times, serif",
                            color: '#FFFFFF'
                        }}>
                            Find Us On Map
                        </h2>
                        <div style={{ 
                            width: '100%', 
                            height: '400px', 
                            backgroundColor: '#e9ecef',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.2rem',
                            color: '#666'
                        }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976373946234!3d40.69766374859258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                                width="100%"
                                height="100%"
                                style={{ border: 0, borderRadius: '10px' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </Col>
                </Row>

                {/* Business Hours */}
                <Row className="mt-5 justify-content-center">
                    <Col md={6}>
                        <Card style={{ border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '30px' }}>
                            <h3 style={{ 
                                textAlign: 'center', 
                                marginBottom: '30px',
                                fontWeight: 'bold'
                            }}>
                                Business Hours
                            </h3>
                            <div style={{ fontSize: '1.1rem', lineHeight: '2' }}>
                                <div className="d-flex justify-content-between mb-2">
                                    <span style={{ fontWeight: '600' }}>Monday - Friday:</span>
                                    <span>11:00 AM - 10:00 PM</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span style={{ fontWeight: '600' }}>Saturday:</span>
                                    <span>10:00 AM - 11:00 PM</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span style={{ fontWeight: '600' }}>Sunday:</span>
                                    <span>10:00 AM - 9:00 PM</span>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Footer myProfile={{
                name: "Van Anh",
                email: "vanhne@example.com",
                avatar: "/images/avt.jpg"
            }} />
        </div>
    );
}

export default Contact;
