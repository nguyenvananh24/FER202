import React from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { FiDollarSign } from 'react-icons/fi';

function formatVND(amount) {
  return Number(amount).toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
}

function TotalCard({ total, loading, categoryFilter }) {
  return (
    <Card className="shadow border-0 rounded-4 mb-4">
      <Card.Body className="text-center py-4">
        <div
          className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
          style={{
            width: 56,
            height: 56,
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
          }}
        >
          <FiDollarSign color="white" size={24} />
        </div>
        <h6 className="text-muted fw-semibold mb-1">Total of Expenses</h6>
        {loading ? (
          <Spinner animation="border" variant="primary" size="sm" />
        ) : (
          <h4 className="fw-bold text-primary mb-0">{formatVND(total)}</h4>
        )}
        {categoryFilter && (
          <small className="text-muted">
            Filtered by: <strong>{categoryFilter}</strong>
          </small>
        )}
      </Card.Body>
    </Card>
  );
}

export default TotalCard;
