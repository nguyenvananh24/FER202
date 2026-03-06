import React from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { FiList } from 'react-icons/fi';
import ExpenseTable from './ExpenseTable';

function ExpenseSection({ expenses, loading, onEdit, onDelete }) {
  return (
    <Card className="shadow border-0 rounded-4">
      <Card.Header
        className="fw-bold border-0 rounded-top-4 d-flex justify-content-between align-items-center"
        style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' }}
      >
        <span>
          <FiList className="me-2" />
          Expense Management
        </span>
        <span className="badge bg-white text-primary">
          {expenses.length} record(s)
        </span>
      </Card.Header>
      <Card.Body className="p-0">
        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <ExpenseTable
            expenses={expenses}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default ExpenseSection;
