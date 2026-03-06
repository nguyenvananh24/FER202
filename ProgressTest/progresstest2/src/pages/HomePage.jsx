import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { FiPlusCircle } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useExpenses } from '../contexts/ExpenseContext';
import expenseService from '../services/expenseService';
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
    <>
      <AppNavbar />

      <div
        className="min-vh-100 py-4"
        style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}
      >
        <Container>
          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          )}

          <Row className="g-4">
            {/* ── LEFT COLUMN ── */}
            <Col xs={12} lg={4}>
              <TotalCard
                total={totalAmount}
                loading={loading}
                categoryFilter={categoryFilter}
              />

              <FilterCard
                categoryFilter={categoryFilter}
                onChange={setCategoryFilter}
              />

              <Card className="shadow border-0 rounded-4">
                <Card.Header
                  className="fw-bold border-0 rounded-top-4"
                  style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' }}
                >
                  <FiPlusCircle className="me-2" />
                  {editingExpense ? 'Edit Expense' : 'Add Expense'}
                </Card.Header>
                <Card.Body>
                  <ExpenseForm
                    onSubmit={handleSubmitExpense}
                    editingExpense={editingExpense}
                    onCancelEdit={() => setEditingExpense(null)}
                  />
                </Card.Body>
              </Card>
            </Col>

            {/* ── RIGHT COLUMN ── */}
            <Col xs={12} lg={8}>
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
        className="text-center py-3 text-white"
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        <small>© {new Date().getFullYear()} PersonalBudget — All rights reserved.</small>
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
    </>
  );
}

export default HomePage;
