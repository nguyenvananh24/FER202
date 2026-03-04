import React, { useEffect, useState } from 'react';
import {
  Container, Table, Badge, Button, Spinner, Alert, Image, Navbar, Nav
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiLock, FiUnlock, FiLogOut } from 'react-icons/fi';
import accountService from '../services/accountService';
import { useAccounts } from '../contexts/AccountContext';
import { useAuth } from '../contexts/AuthContext';
import FilterBar from '../components/FilterBar';
import ConfirmModal from '../components/ConfirmModal';
import ToastMessage from '../components/ToastMessage';

function AccountListPage() {
  const navigate = useNavigate();
  const { loggedUser, logout } = useAuth();
  const { accounts, loading, error, setLoading, setAccounts, setError, updateAccountStatus } =
    useAccounts();

  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    role: 'all',
    sortBy: '',
  });

  const [confirmModal, setConfirmModal] = useState({
    show: false,
    account: null,
    action: '',
  });

  const [toast, setToast] = useState({ show: false, message: '', variant: 'success' });
  const [warningMsg, setWarningMsg] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        const res = await accountService.getAll();
        setAccounts(res.data);
      } catch {
        setError('Failed to load accounts from server.');
      }
    };
    fetchAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLockUnlock = (account) => {
    if (loggedUser && account.id === loggedUser.id) {
      setWarningMsg('You cannot lock your own account.');
      return;
    }
    const action = account.status === 'active' ? 'lock' : 'unlock';
    setConfirmModal({ show: true, account, action });
  };

  const handleConfirm = async () => {
    const { account, action } = confirmModal;
    const newStatus = action === 'lock' ? 'locked' : 'active';
    try {
      await accountService.updateStatus(account.id, newStatus);
      updateAccountStatus(account.id, newStatus);
      setToast({
        show: true,
        message: action === 'lock' ? 'Locked successfully.' : 'Unlocked successfully.',
        variant: 'success',
      });
    } catch {
      setToast({ show: true, message: 'Failed to update status.', variant: 'danger' });
    } finally {
      setConfirmModal({ show: false, account: null, action: '' });
    }
  };

  const handleCancel = () => {
    setConfirmModal({ show: false, account: null, action: '' });
  };

  // Filter + sort logic
  const getFilteredAccounts = () => {
    let list = [...accounts];

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (acc) =>
          acc.username.toLowerCase().includes(q) || acc.email.toLowerCase().includes(q)
      );
    }

    if (filters.status !== 'all') {
      list = list.filter((acc) => acc.status === filters.status);
    }

    if (filters.role !== 'all') {
      list = list.filter((acc) => acc.role === filters.role);
    }

    switch (filters.sortBy) {
      case 'username_asc':
        list.sort((a, b) => a.username.localeCompare(b.username));
        break;
      case 'username_desc':
        list.sort((a, b) => b.username.localeCompare(a.username));
        break;
      case 'role_admin':
        list.sort((a, b) => (a.role === 'admin' ? -1 : 1));
        break;
      case 'role_user':
        list.sort((a, b) => (a.role === 'user' ? -1 : 1));
        break;
      case 'status_active':
        list.sort((a, b) => (a.status === 'active' ? -1 : 1));
        break;
      case 'status_locked':
        list.sort((a, b) => (a.status === 'locked' ? -1 : 1));
        break;
      default:
        break;
    }

    return list;
  };

  const filteredAccounts = getFilteredAccounts();

  return (
    <>
      <Navbar bg="primary" variant="dark" className="px-3">
        <Navbar.Brand className="fw-bold">👤 Account Management</Navbar.Brand>
        <Nav className="ms-auto align-items-center">
          {loggedUser && (
            <Nav.Item className="text-white me-3">
              <Image
                src={loggedUser.avatar}
                roundedCircle
                width={32}
                height={32}
                className="me-2"
                onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Admin'; }}
              />
              <span className="fw-semibold">{loggedUser.username}</span>
            </Nav.Item>
          )}
          <Button variant="outline-light" size="sm" onClick={handleLogout}>
            <FiLogOut className="me-1" /> Logout
          </Button>
        </Nav>
      </Navbar>

      <Container className="mt-4">
        <h4 className="mb-4 fw-bold">Account List</h4>

        {warningMsg && (
          <Alert variant="warning" onClose={() => setWarningMsg('')} dismissible>
            {warningMsg}
          </Alert>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        <FilterBar filters={filters} onFilterChange={setFilters} />

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Loading accounts...</p>
          </div>
        ) : (
          <Table responsive bordered hover className="align-middle">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-4">
                    No accounts found.
                  </td>
                </tr>
              ) : (
                filteredAccounts.map((acc, idx) => (
                  <tr key={acc.id}>
                    <td>{idx + 1}</td>
                    <td>
                      <Image
                        src={acc.avatar}
                        roundedCircle
                        width={40}
                        height={40}
                        style={{ objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${acc.username}`;
                        }}
                      />
                    </td>
                    <td className="fw-semibold">{acc.username}</td>
                    <td>{acc.email}</td>
                    <td>
                      <Badge bg={acc.role === 'admin' ? 'primary' : 'secondary'}>
                        {acc.role}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg={acc.status === 'active' ? 'success' : 'danger'}>
                        {acc.status}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="me-2"
                        onClick={() => navigate(`/accounts/${acc.id}`)}
                      >
                        <FiEye className="me-1" /> View Details
                      </Button>
                      <Button
                        variant={acc.status === 'active' ? 'outline-danger' : 'outline-success'}
                        size="sm"
                        onClick={() => handleLockUnlock(acc)}
                      >
                        {acc.status === 'active' ? (
                          <><FiLock className="me-1" /> Lock</>
                        ) : (
                          <><FiUnlock className="me-1" /> Unlock</>
                        )}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
      </Container>

      {/* Confirm Modal */}
      <ConfirmModal
        show={confirmModal.show}
        title={confirmModal.action === 'lock' ? 'Lock Account' : 'Unlock Account'}
        message={
          confirmModal.action === 'lock'
            ? `Lock account "${confirmModal.account?.username}"? The user cannot log in after this.`
            : `Unlock account "${confirmModal.account?.username}"?`
        }
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      {/* Toast */}
      <ToastMessage
        show={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </>
  );
}

export default AccountListPage;
