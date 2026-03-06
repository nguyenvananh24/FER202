import React from 'react';
import { Card, Form } from 'react-bootstrap';

const CATEGORIES = ['Food', 'Utilities', 'Entertainment', 'Transport', 'Health', 'Shopping', 'Education', 'Other'];

function FilterCard({ categoryFilter, onChange }) {
  return (
    <Card className="h-100" style={{ border: '1px solid #dee2e6', borderRadius: 8 }}>
      <Card.Body className="py-4 px-4">
        <h5 className="fw-bold text-dark mb-3">Filter</h5>
        <Form.Label className="text-secondary mb-1" style={{ fontSize: '0.9rem' }}>
          Category
        </Form.Label>
        <Form.Select
          value={categoryFilter}
          onChange={(e) => onChange(e.target.value)}
          style={{ maxWidth: 260 }}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </Form.Select>
      </Card.Body>
    </Card>
  );
}

export default FilterCard;
