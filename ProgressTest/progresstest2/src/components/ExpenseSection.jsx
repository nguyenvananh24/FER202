import React from 'react';
import { Card, Spinner } from 'react-bootstrap';
import ExpenseTable from './ExpenseTable';

function ExpenseSection({ expenses, loading, onEdit, onDelete }) {
  return (
    <Card style={{ border: '1px solid #dee2e6', borderRadius: 8 }}>
      <Card.Body className="py-4 px-4">
        <h5 className="fw-bold text-dark mb-3">Expense Management</h5>
        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner animation="border" variant="secondary" />
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
