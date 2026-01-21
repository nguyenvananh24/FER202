import React from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';

function ViewDetailModal({ show, handleClose, pizza }) {
    if (!pizza) return null;

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                    {pizza.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-6">
                        <img 
                            src={pizza.image} 
                            alt={pizza.name} 
                            style={{ 
                                width: '100%', 
                                height: 'auto', 
                                borderRadius: '8px',
                                objectFit: 'cover',
                                maxHeight: '400px'
                            }} 
                        />
                    </div>
                    <div className="col-md-6">
                        <h5 style={{ fontWeight: '600', marginBottom: '15px' }}>Description</h5>
                        <p style={{ lineHeight: '1.6', color: '#555' }}>{pizza.description}</p>
                        
                        <div className="mt-4">
                            <h5 style={{ fontWeight: '600', marginBottom: '10px' }}>Price</h5>
                            <div className="d-flex align-items-center">
                                {pizza.oldPrice && (
                                    <span 
                                        className="text-muted text-decoration-line-through me-3" 
                                        style={{ fontSize: '1.2rem' }}
                                    >
                                        ${pizza.oldPrice.toFixed(2)}
                                    </span>
                                )}
                                <span 
                                    className="text-danger fw-bold" 
                                    style={{ fontSize: '2rem' }}
                                >
                                    ${pizza.price.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {pizza.tags && pizza.tags.length > 0 && (
                            <div className="mt-4">
                                <h5 style={{ fontWeight: '600', marginBottom: '10px' }}>Tags</h5>
                                <div>
                                    {pizza.tags.map((tag, index) => (
                                        <Badge 
                                            key={index} 
                                            bg={tag.toLowerCase() === 'sale' ? 'warning' : 'success'} 
                                            className="me-2 mb-2"
                                            style={{ 
                                                fontSize: '0.85rem',
                                                fontWeight: 'bold',
                                                textTransform: 'uppercase',
                                                padding: '8px 12px'
                                            }}
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-4">
                            <h5 style={{ fontWeight: '600', marginBottom: '10px' }}>Additional Info</h5>
                            <ul style={{ lineHeight: '1.8', color: '#666' }}>
                                <li>Fresh ingredients daily</li>
                                <li>Hand-tossed dough</li>
                                <li>Cooked in wood-fired oven</li>
                                <li>Available for delivery</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer style={{ borderTop: '2px solid #f0f0f0' }}>
                <Button 
                    variant="secondary" 
                    onClick={handleClose}
                    style={{ 
                        padding: '10px 25px',
                        fontWeight: '600'
                    }}
                >
                    Close
                </Button>
                <Button 
                    variant="dark"
                    style={{ 
                        padding: '10px 25px',
                        fontWeight: '600',
                        backgroundColor: '#2c2c2c'
                    }}
                >
                    Add to Cart - ${pizza.price.toFixed(2)}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ViewDetailModal;
