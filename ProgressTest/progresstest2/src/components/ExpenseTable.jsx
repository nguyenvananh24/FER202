import React from 'react';
import { Table, Button } from 'react-bootstrap';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}-${month}-${year}`;
}

function formatVND(amount) {
  return Number(amount).toLocaleString('vi-VN') + ' đ';
}

function ExpenseTable({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div className="text-center text-muted py-4">
        <p>No expenses found.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <Table bordered hover className="mb-0 align-middle">
        <thead>
          <tr>
            <th style={{ fontWeight: 700 }}>Name</th>
            <th style={{ fontWeight: 700 }}>Amount</th>
            <th style={{ fontWeight: 700 }}>Category</th>
            <th style={{ fontWeight: 700 }}>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id} style={{ background: '#f8f9fa' }}>
              <td>{exp.name}</td>
              <td>{formatVND(exp.amount)}</td>
              <td>{exp.category}</td>
              <td>{formatDate(exp.date)}</td>
              <td className="text-center" style={{ whiteSpace: 'nowrap' }}>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-1 text-white fw-bold"
                  style={{ minWidth: 50 }}
                  onClick={() => onEdit(exp)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  style={{ minWidth: 60 }}
                  onClick={() => onDelete(exp)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ExpenseTable;
