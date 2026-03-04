import React, { useEffect, useState } from 'react';
import {
  Container, Card, Row, Col, Badge, Button, Spinner, Alert, Image
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiMail, FiShield, FiInfo } from 'react-icons/fi';
import accountService from '../services/accountService';

function AccountDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await accountService.getById(id);
        setAccount(res.data);
      } catch {
        setError('Account not found or server error.');
      } finally {
        setLoading(false);
      }
    };
    fetchAccount();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="secondary" onClick={() => navigate('/accounts')}>
          <FiArrowLeft className="me-2" />
          Back to List
        </Button>
      </Container>
    );
  }

  return (
    <div
      className="min-vh-100"
      style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}
    >
      <Container className="py-5">
        <Button
          variant="outline-secondary"
          className="mb-4"
          onClick={() => navigate('/accounts')}
        >
          <FiArrowLeft className="me-2" />
          Back to List
        </Button>

        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
              {/* Header banner */}
              <div
                className="text-center py-5"
                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
              >
                <Image
                  src={account.avatar}
                  roundedCircle
                  width={110}
                  height={110}
                  className="border border-4 border-white shadow"
                  style={{ objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${account.username}&size=110`;
                  }}
                />
                <h4 className="text-white fw-bold mt-3 mb-0">{account.username}</h4>
                <p className="text-white-50 mb-0">{account.email}</p>
              </div>

              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3 text-muted">Account Details</h5>

                <Row className="mb-3 align-items-center">
                  <Col xs={1}><FiUser className="text-primary" /></Col>
                  <Col xs={4} className="fw-semibold text-muted">Username</Col>
                  <Col xs={7} className="fw-bold">{account.username}</Col>
                </Row>

                <hr className="my-2" />

                <Row className="mb-3 align-items-center">
                  <Col xs={1}><FiMail className="text-primary" /></Col>
                  <Col xs={4} className="fw-semibold text-muted">Email</Col>
                  <Col xs={7}>{account.email}</Col>
                </Row>

                <hr className="my-2" />

                <Row className="mb-3 align-items-center">
                  <Col xs={1}><FiShield className="text-primary" /></Col>
                  <Col xs={4} className="fw-semibold text-muted">Role</Col>
                  <Col xs={7}>
                    <Badge
                      bg={account.role === 'admin' ? 'primary' : 'secondary'}
                      className="px-3 py-2"
                    >
                      {account.role.toUpperCase()}
                    </Badge>
                  </Col>
                </Row>

                <hr className="my-2" />

                <Row className="mb-3 align-items-center">
                  <Col xs={1}><FiInfo className="text-primary" /></Col>
                  <Col xs={4} className="fw-semibold text-muted">Status</Col>
                  <Col xs={7}>
                    <Badge
                      bg={account.status === 'active' ? 'success' : 'danger'}
                      className="px-3 py-2"
                    >
                      {account.status.toUpperCase()}
                    </Badge>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AccountDetailPage;
