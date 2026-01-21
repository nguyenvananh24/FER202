import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AboutUs() {
    const sectionStyle = {
        padding: '60px 0',
        backgroundColor: '#f8f9fa'
    };

    const heroStyle = {
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/images/1.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '100px 0',
        color: 'white',
        textAlign: 'center',
        marginBottom: '50px'
    };

    const cardStyle = {
        border: 'none',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        height: '100%'
    };

    return (
        <div>
            <Header />
            
            {/* Hero Section */}
            <div style={heroStyle}>
                <Container>
                    <h1 style={{ fontSize: '3.5rem', color: '#FFFFFF', fontWeight: 'bold', marginBottom: '20px', fontFamily: "'Times New Roman', Times, serif" }}>
                        About Pizza House
                    </h1>
                    <p style={{ fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto' }}>
                        Serving authentic Italian pizza since 1995
                    </p>
                </Container>
            </div>

            {/* Our Story Section */}
            <Container style={{ padding: '60px 0' }}>
                <Row className="justify-content-center mb-5">
                    <Col md={8} className="text-center">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', fontFamily: "'Times New Roman', Times, serif", color: '#333' }}>
                            Our Story
                        </h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666', marginBottom: '20px' }}>
                            Pizza House was founded in 1995 by Giovanni Rossi, a passionate chef from Naples, Italy. 
                            With a dream to bring authentic Italian pizza to the world, Giovanni started with a small 
                            wood-fired oven and a handful of traditional family recipes passed down through generations.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666' }}>
                            Today, Pizza House has grown into a beloved restaurant chain, but we've never forgotten our roots. 
                            We still use the same traditional methods, the finest ingredients, and the same passion that 
                            Giovanni brought with him from Italy.
                        </p>
                    </Col>
                </Row>
            </Container>

            {/* Our Values Section */}
            <div style={sectionStyle}>
                    <Container>
                        <h2 style={{ 
                            fontSize: '2.5rem', 
                            textAlign: 'center', 
                            marginBottom: '50px',
                            fontFamily: "'Times New Roman', Times, serif"
                        }}>
                            Our Values
                        </h2>
                        <Row>
                            <Col md={4} className="mb-4">
                                <Card style={cardStyle}>
                                    <Card.Body className="text-center p-4">
                                        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🍕</div>
                                        <h4 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Quality Ingredients</h4>
                                        <p style={{ color: '#666', lineHeight: '1.6' }}>
                                            We source only the finest, freshest ingredients from trusted suppliers. 
                                            Our mozzarella is imported from Italy, and our vegetables are locally grown.
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4} className="mb-4">
                                <Card style={cardStyle}>
                                    <Card.Body className="text-center p-4">
                                        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>👨‍🍳</div>
                                        <h4 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Traditional Methods</h4>
                                        <p style={{ color: '#666', lineHeight: '1.6' }}>
                                            Every pizza is hand-tossed and baked in our wood-fired oven at 900°F, 
                                            following authentic Neapolitan techniques that have been perfected over centuries.
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4} className="mb-4">
                                <Card style={cardStyle}>
                                    <Card.Body className="text-center p-4">
                                        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>❤️</div>
                                        <h4 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Passion & Love</h4>
                                        <p style={{ color: '#666', lineHeight: '1.6' }}>
                                            We pour our heart and soul into every pizza we make. 
                                            Our team is dedicated to creating not just food, but memorable experiences.
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>

            <Footer myProfile={{
                name: "Van Anh",
                email: "vanhne@example.com",
                avatar: "/images/avt.jpg"
            }} />
        </div>
    );
}

export default AboutUs;
