import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const CATEGORIES = ['Food', 'Utilities', 'Entertainment', 'Transport', 'Health', 'Shopping', 'Education', 'Other'];

const emptyForm = { name: '', amount: '', category: '', date: '' };
const emptyTouched = { name: false, amount: false, category: false, date: false };

const getToday = () => new Date().toISOString().split('T')[0];

function validateField(name, value) {
  switch (name) {
    case 'name':
      return !value.trim() ? 'Name is required.' : '';
    case 'category':
      return !value ? 'Category is required.' : '';
    case 'amount':
      return !value || isNaN(value) || Number(value) <= 0
        ? 'Amount must be a valid number greater than 0.'
        : '';
    case 'date':
      if (!value) return 'Date is required.';
      if (value > getToday()) return 'Date cannot be in the future.';
      return '';
    default:
      return '';
  }
}

function ExpenseForm({ onSubmit, editingExpense, onCancelEdit }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(emptyTouched);

  useEffect(() => {
    if (editingExpense) {
      setForm({
        name: editingExpense.name,
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date,
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
    setTouched(emptyTouched);
  }, [editingExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateAll = () => {
    const newErrors = {};
    const allTouched = {};
    Object.keys(form).forEach((key) => {
      newErrors[key] = validateField(key, form[key]);
      allTouched[key] = true;
    });
    setErrors(newErrors);
    setTouched(allTouched);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    onSubmit(form);
    setForm(emptyForm);
    setErrors({});
    setTouched(emptyTouched);
  };

  const handleReset = () => {
    setForm(emptyForm);
    setErrors({});
    setTouched(emptyTouched);
    onCancelEdit();
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      {/* Name */}
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.name && !!errors.name}
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>

      {/* Amount + Category */}
      <Row className="mb-3">
        <Col xs={6}>
          <Form.Group>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.amount && !!errors.amount}
              min="1"
            />
            <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={form.category}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.category && !!errors.category}
            >
              <option value="">Select category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      {/* Date */}
      <Form.Group className="mb-4">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          onBlur={handleBlur}
          max={getToday()}
          isInvalid={touched.date && !!errors.date}
        />
        <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
      </Form.Group>

      {/* Buttons */}
      <div className="d-flex gap-2">
        <Button type="button" variant="secondary" onClick={handleReset}>
          Reset
        </Button>
        {editingExpense ? (
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        ) : (
          <Button type="submit" variant="primary">
            Add expense
          </Button>
        )}
      </div>
    </Form>
  );
}

export default ExpenseForm;
