import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Navbar,
  Nav,
  Button,
  Form,
  InputGroup,
  Spinner,
  Alert,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  FiLogOut,
  FiSearch,
  FiPlusCircle,
  FiList,
  FiDollarSign,
} from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useExpenses } from '../contexts/ExpenseContext';
import expenseService from '../services/expenseService';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import ConfirmModal from '../components/ConfirmModal';
import ToastMessage from '../components/ToastMessage';

function formatVND(amount) {
  return Number(amount).toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
}

function HomePage() {
  const navigate = useNavigate();
  const { loggedUser, logout } = useAuth();
  const {
    expenses,
    loading,
    error,
    setLoading,
    setExpenses,
    setError,
    addExpense,
    updateExpense,
    deleteExpense,
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
        // Filter client-side for current user (json-server v1 beta doesn't support ?field=value)
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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Add or Update expense
  const handleSubmitExpense = async (form) => {
    try {
      if (editingExpense) {
        const updated = { ...editingExpense, ...form, amount: Number(form.amount) };
        await expenseService.updateExpense(editingExpense.id, updated);
        updateExpense(updated);
        setEditingExpense(null);
        showToast('Expense updated successfully!', 'success');
      } else {
        const newExpense = {
          ...form,
          amount: Number(form.amount),
          userId: loggedUser.id,
        };
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
    // scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (expense) => {
    setConfirmModal({ show: true, expense });
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

  const handleCancelDelete = () => {
    setConfirmModal({ show: false, expense: null });
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  const showToast = (message, variant) => {
    setToast({ show: true, message, variant });
  };

  // Filter expenses by category
  const filteredExpenses = categoryFilter.trim()
    ? expenses.filter((exp) =>
        exp.category.toLowerCase().includes(categoryFilter.toLowerCase())
      )
    : expenses;

  // Total of filtered expenses
  const totalAmount = filteredExpenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  return (
    <>
      {/* ── NAVBAR ── */}
      <Navbar
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        variant="dark"
        className="px-3 shadow"
      >
        <Navbar.Brand className="fw-bold fs-5 d-flex align-items-center">
          <img
            src="/logo.jpg"
            alt="PersonalBudget logo"
            width={36}
            height={36}
            className="me-2 rounded-circle"
            style={{ objectFit: 'cover' }}
          />
          PersonalBudget
        </Navbar.Brand>
        <Nav className="ms-auto align-items-center gap-2">
          {loggedUser && (
            <Nav.Item className="text-white">
              Signed in as{' '}
              <span className="fw-bold">{loggedUser.fullName}</span>
            </Nav.Item>
          )}
          <Button variant="outline-light" size="sm" onClick={handleLogout}>
            <FiLogOut className="me-1" />
            Logout
          </Button>
        </Nav>
      </Navbar>

      {/* ── BODY ── */}
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
              {/* Total Expenses Card */}
              <Card className="shadow border-0 rounded-4 mb-4">
                <Card.Body className="text-center py-4">
                  <div
                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: 56,
                      height: 56,
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    }}
                  >
                    <FiDollarSign color="white" size={24} />
                  </div>
                  <h6 className="text-muted fw-semibold mb-1">Total of Expenses</h6>
                  {loading ? (
                    <Spinner animation="border" variant="primary" size="sm" />
                  ) : (
                    <h4 className="fw-bold text-primary mb-0">{formatVND(totalAmount)}</h4>
                  )}
                  {categoryFilter && (
                    <small className="text-muted">
                      Filtered by: <strong>{categoryFilter}</strong>
                    </small>
                  )}
                </Card.Body>
              </Card>

              {/* Filter Card */}
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
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    />
                    {categoryFilter && (
                      <Button
                        variant="outline-secondary"
                        onClick={() => setCategoryFilter('')}
                      >
                        ✕
                      </Button>
                    )}
                  </InputGroup>
                </Card.Body>
              </Card>

              {/* Add / Edit Expense Form Card */}
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
                    onCancelEdit={handleCancelEdit}
                  />
                </Card.Body>
              </Card>
            </Col>

            {/* ── RIGHT COLUMN ── */}
            <Col xs={12} lg={8}>
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
                    {filteredExpenses.length} record(s)
                  </span>
                </Card.Header>
                <Card.Body className="p-0">
                  {loading ? (
                    <div className="d-flex justify-content-center py-5">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : (
                    <ExpenseTable
                      expenses={filteredExpenses}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ── FOOTER ── */}
      <footer
        className="text-center py-3 text-white"
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        <small>
          © {new Date().getFullYear()} PersonalBudget — All rights reserved.
        </small>
      </footer>

      {/* ── MODALS & TOASTS ── */}
      <ConfirmModal
        show={confirmModal.show}
        title="Delete Expense"
        message={`Are you sure you want to delete "${confirmModal.expense?.name}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
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
