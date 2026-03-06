import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FiPlusCircle, FiSave } from 'react-icons/fi';

const CATEGORIES = ['Food', 'Utilities', 'Entertainment', 'Transport', 'Health', 'Shopping', 'Education', 'Other'];

const emptyForm = { name: '', amount: '', category: '', date: '' };
const emptyTouched = { name: false, amount: false, category: false, date: false };

const getToday = () => new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

function validateField(name, value) {
  switch (name) {
    case 'name':
      return !value.trim() ? 'Name is required.' : '';
    case 'category':
      return !value || value === '' ? 'Category is required.' : '';
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
    // Nếu field đã được touch rồi thì validate ngay khi gõ
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

  const handleCancel = () => {
    setForm(emptyForm);
    setErrors({});
    setTouched(emptyTouched);
    onCancelEdit();
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Row className="g-2">
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label className="fw-semibold">Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="e.g. Lunch"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.name && !!errors.name}
              isValid={touched.name && !errors.name && form.name.trim() !== ''}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label className="fw-semibold">Amount (VND)</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              placeholder="e.g. 85000"
              value={form.amount}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.amount && !!errors.amount}
              isValid={touched.amount && !errors.amount && form.amount !== ''}
              min="1"
            />
            <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label className="fw-semibold">Category</Form.Label>
            <Form.Select
              name="category"
              value={form.category}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.category && !!errors.category}
              isValid={touched.category && !errors.category && form.category !== ''}
            >
              <option value="">Select category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label className="fw-semibold">Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              onBlur={handleBlur}
              max={getToday()}
              isInvalid={touched.date && !!errors.date}
              isValid={touched.date && !errors.date && form.date !== ''}
            />
            <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <div className="mt-3 d-flex gap-2">
        {editingExpense ? (
          <>
            <Button type="submit" variant="success">
              <FiSave className="me-2" />
              Save Changes
            </Button>
            <Button type="button" variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button type="submit" variant="primary">
              <FiPlusCircle className="me-2" />
              Add Expense
            </Button>
            <Button
              type="button"
              variant="outline-secondary"
              onClick={handleCancel}
            >
              Reset
            </Button>
          </>
        )}
      </div>
    </Form>
  );
}

export default ExpenseForm;
