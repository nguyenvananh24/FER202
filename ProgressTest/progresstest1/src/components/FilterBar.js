import React from 'react';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';

function FilterBar({ filters, onFilterChange }) {
  const { search, status, role, sortBy } = filters;

  const handleChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="bg-light p-3 rounded mb-4 border">
      <Row className="g-3 align-items-end">
        <Col md={4}>
          <Form.Label className="fw-semibold">Search</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <FiSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by username or email..."
              value={search}
              onChange={(e) => handleChange('search', e.target.value)}
            />
          </InputGroup>
        </Col>

        <Col md={2}>
          <Form.Label className="fw-semibold">Status</Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => handleChange('status', e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="locked">Locked</option>
          </Form.Select>
        </Col>

        <Col md={2}>
          <Form.Label className="fw-semibold">Role</Form.Label>
          <Form.Select
            value={role}
            onChange={(e) => handleChange('role', e.target.value)}
          >
            <option value="all">All</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Form.Select>
        </Col>

        <Col md={4}>
          <Form.Label className="fw-semibold">Sort By</Form.Label>
          <Form.Select
            value={sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
          >
            <option value="">-- No Sorting --</option>
            <option value="username_asc">Username (A → Z)</option>
            <option value="username_desc">Username (Z → A)</option>
            <option value="role_admin">Role (Admin first)</option>
            <option value="role_user">Role (User first)</option>
            <option value="status_active">Status (Active first)</option>
            <option value="status_locked">Status (Locked first)</option>
          </Form.Select>
        </Col>
      </Row>
    </div>
  );
}

export default FilterBar;
