//PizzaCard dùng để tạo 1 thẻ hỉển thị thông tin pizaa gồm: id, hình ảnh, tên pizza, price, old price, mô tả, tag
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ViewDetailModal from './ViewDetailModal';

function PizzaCard({ pizza }) {
    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <>
        <Card className="h-100" style={{ 
            transition: 'box-shadow 0.3s ease', 
            boxShadow: isHovered ? '0 8px 16px rgba(0,0,0,0.2)' : 'none' 
        }}>
            <div 
                style={{
                    overflow: 'hidden',
                    position: 'relative'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Card.Img 
                    variant="top" 
                    src={pizza.image} 
                    style={{ 
                        height: '250px', 
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                        cursor: 'pointer'
                    }}
                />
                {pizza.tags && (
                    <div className="position-absolute" style={{ top: '10px', left: '10px' }}>
                        {pizza.tags.map((tag, index) => (
                            <Badge 
                                key={index} 
                                bg={tag.toLowerCase() === 'sale' ? 'warning' : 'success'} 
                                className="me-1"
                                style={{ 
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase'
                                }}
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>
            <Card.Body className="d-flex flex-column" style={{ minHeight: '150px' }}>
                <Card.Title>{pizza.name}</Card.Title>
                <Card.Text className="flex-grow-1" style={{ fontSize: '0.9rem' }}>
                    {pizza.description}
                </Card.Text>
                <div className="mt-auto">
                    <div className="d-flex align-items-center justify-content-start mb-2">
                        {pizza.oldPrice && (
                            <span className="text-muted text-decoration-line-through me-2" style={{ fontSize: '0.9rem' }}>
                                ${pizza.oldPrice.toFixed(2)}
                            </span>
                        )}
                        <span className="text-dark fw-bold" style={{ fontSize: '1.1rem' }}>
                            ${pizza.price.toFixed(2)}
                        </span>
                    </div>
                    <div className="d-flex gap-2 mt-2">
                        <Button variant="dark" className="flex-fill">Buy</Button>
                        <Button variant="outline-dark" className="flex-fill" onClick={handleShow}>View Details</Button>
                    </div>
                </div>
            </Card.Body>
        </Card>

        {/* ViewDetailModal Component */}
        <ViewDetailModal 
            show={showModal} 
            handleClose={handleClose} 
            pizza={pizza} 
        />
        </>
    );
}

export default PizzaCard;   