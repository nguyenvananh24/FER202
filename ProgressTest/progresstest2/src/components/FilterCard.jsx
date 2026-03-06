import React from 'react';
import { Card, Form, InputGroup, Button } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';

function FilterCard({ categoryFilter, onChange }) {
  return (
    <Card className="shadow border-0 rounded-4 mb-4">
      <Card.Header
        className="fw-bold border-0 rounded-top-4"
        style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' }}
      >
        <FiSearch className="me-2" />
        Filter by Category
      </Card.Header>
      <Card.Body>
        <InputGroup>
          <InputGroup.Text>
            <FiSearch />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Category (e.g., Food)"
            value={categoryFilter}
            onChange={(e) => onChange(e.target.value)}
          />
          {categoryFilter && (
            <Button variant="outline-secondary" onClick={() => onChange('')}>
              ✕
            </Button>
          )}
        </InputGroup>
      </Card.Body>
    </Card>
  );
}

export default FilterCard;
