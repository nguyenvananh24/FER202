import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useExpenses } from '../contexts/ExpenseContext';
import expenseService from '../services/api';
import AppNavbar from '../components/AppNavbar';
import TotalCard from '../components/TotalCard';
import FilterCard from '../components/FilterCard';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseSection from '../components/ExpenseSection';
import ConfirmModal from '../components/ConfirmModal';
import ToastMessage from '../components/ToastMessage';

function HomePage() {
  const { loggedUser } = useAuth();
  const {
    expenses, loading, error,
    setLoading, setExpenses, setError,
    addExpense, updateExpense, deleteExpense,
  } = useExpenses();

  const [categoryFilter, setCategoryFilter] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ show: false, expense: null });
  const [toast, setToast] = useState({ show: false, message: '', variant: 'success' });

  // Fetch expenses for current user
  useEffect(() => {
    if (!loggedUser) return;
    const fetchExpenses = async () => {
      setLoading(true);
      try {
        const res = await expenseService.getAllExpenses();
        const userExpenses = res.data.filter(
          (exp) => String(exp.userId) === String(loggedUser.id)
        );
        setExpenses(userExpenses);
      } catch {
        setError('Failed to load expenses from server.');
      }
    };
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUser]);

  const showToast = (message, variant) =>
    setToast({ show: true, message, variant });

  const handleSubmitExpense = async (form) => {
    try {
      if (editingExpense) {
        const updated = { ...editingExpense, ...form, amount: Number(form.amount) };
        await expenseService.updateExpense(editingExpense.id, updated);
        updateExpense(updated);
        setEditingExpense(null);
        showToast('Expense updated successfully!', 'success');
      } else {
        const newExpense = { ...form, amount: Number(form.amount), userId: loggedUser.id };
        const res = await expenseService.addExpense(newExpense);
        addExpense(res.data);
        showToast('Expense added successfully!', 'success');
      }
    } catch {
      showToast('Failed to save expense. Try again.', 'danger');
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmDelete = async () => {
    const { expense } = confirmModal;
    try {
      await expenseService.deleteExpense(expense.id);
      deleteExpense(expense.id);
      showToast('Expense deleted successfully!', 'success');
    } catch {
      showToast('Failed to delete expense. Try again.', 'danger');
    } finally {
      setConfirmModal({ show: false, expense: null });
    }
  };

  // Filter + total
  const filteredExpenses = categoryFilter.trim()
    ? expenses.filter((exp) =>
        exp.category.toLowerCase().includes(categoryFilter.toLowerCase())
      )
    : expenses;

  const totalAmount = filteredExpenses.reduce(
    (sum, exp) => sum + Number(exp.amount), 0
  );

  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: '#fff' }}>
      <AppNavbar />

      <div className="flex-grow-1 py-4" style={{ background: '#fff' }}>
        <Container fluid="lg">
          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          )}

          {/* ── ROW 1: Total + Filter ── */}
          <Row className="g-3 mb-3">
            <Col xs={12} md={5}>
              <TotalCard total={totalAmount} loading={loading} />
            </Col>
            <Col xs={12} md={7}>
              <FilterCard categoryFilter={categoryFilter} onChange={setCategoryFilter} />
            </Col>
          </Row>

          {/* ── ROW 2: Add Expense + Expense Management ── */}
          <Row className="g-3">
            <Col xs={12} md={5}>
              <Card style={{ border: '1px solid #dee2e6', borderRadius: 8 }}>
                <Card.Body className="py-4 px-4">
                  <h5 className="fw-bold text-dark mb-3">
                    {editingExpense ? 'Edit Expense' : 'Add Expense'}
                  </h5>
                  <ExpenseForm
                    onSubmit={handleSubmitExpense}
                    editingExpense={editingExpense}
                    onCancelEdit={() => setEditingExpense(null)}
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={7}>
              <ExpenseSection
                expenses={filteredExpenses}
                loading={loading}
                onEdit={handleEdit}
                onDelete={(expense) => setConfirmModal({ show: true, expense })}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: '#f8f9fa',
          borderTop: '1px solid #dee2e6',
          padding: '14px 24px',
        }}
      >
        <Container fluid="lg">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <small className="text-secondary">
              © 2025{' '}
              <span style={{ color: '#0d6efd' }}>PersonalBudget Demo</span>
            </small>
            <small className="text-secondary">
              Built with React, Redux Toolkit &amp; JSON Server
            </small>
          </div>
        </Container>
      </footer>

      <ConfirmModal
        show={confirmModal.show}
        title="Delete Expense"
        message={`Are you sure you want to delete "${confirmModal.expense?.name}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmModal({ show: false, expense: null })}
      />

      <ToastMessage
        show={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
}

export default HomePage;
