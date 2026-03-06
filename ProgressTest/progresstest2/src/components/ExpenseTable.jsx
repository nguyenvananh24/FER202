import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}-${month}-${year}`;
}

function formatVND(amount) {
  return Number(amount).toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
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
      <Table hover className="mb-0 align-middle">
        <thead className="table-primary">
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id}>
              <td className="fw-semibold">{exp.name}</td>
              <td className="text-danger fw-bold">{formatVND(exp.amount)}</td>
              <td>
                <Badge bg="info" text="dark" className="px-2 py-1">
                  {exp.category}
                </Badge>
              </td>
              <td>{formatDate(exp.date)}</td>
              <td className="text-center">
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="me-2"
                  onClick={() => onEdit(exp)}
                >
                  <FiEdit2 />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDelete(exp)}
                >
                  <FiTrash2 />
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
