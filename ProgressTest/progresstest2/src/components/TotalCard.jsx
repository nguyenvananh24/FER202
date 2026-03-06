import React from 'react';
import { Card, Spinner } from 'react-bootstrap';

function formatVND(amount) {
  return Number(amount).toLocaleString('vi-VN') + ' đ';
}

function TotalCard({ total, loading }) {
  return (
    <Card
      className="h-100"
      style={{ border: '1px solid #dee2e6', borderRadius: 8 }}
    >
      <Card.Body className="py-4 px-4">
        <h5 className="fw-bold text-dark mb-2">Total of Expenses</h5>
        {loading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          <div className="fw-semibold text-dark" style={{ fontSize: '1.1rem' }}>
            {formatVND(total)}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default TotalCard;
