// PizzaList.jsx dùng để hiển thị danh sách các pizza, dữ liệu của các pizza được lấy từ pizzaList
import React from 'react';
import PizzaCard from '../components/PizzaCard';
import pizzaList from '../data/pizzaList';
import { Container, Row, Col } from 'react-bootstrap';

function PizzaList() {
    // Sử dụng hàm map để lặp qua mảng pizzaList, dữ liệu được chứa trong Container
    return (
        <Container className="my-5">
            <h2 className="text-start mb-4" style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Our Menu</h2>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {pizzaList.map((pizza) => (
                    <Col key={pizza.id} className="d-flex">
                        <PizzaCard pizza={pizza} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default PizzaList;