import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  FaReact,
  FaBootstrap,
  FaDatabase,
} from 'react-icons/fa';
import { SiRedux, SiAxios, SiJsonwebtokens } from 'react-icons/si';

function AppFooter() {
  return (
    <footer
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        padding: '18px 0 14px',
        marginTop: 'auto',
      }}
    >
      <Container>
        <Row className="align-items-center">
          {/* Left: copyright */}
          <Col xs={12} md={6} className="text-center text-md-start mb-2 mb-md-0">
            <small style={{ fontSize: '0.88rem' }}>
              © {new Date().getFullYear()}{' '}
              <strong>Personal Budget Management</strong>. All rights reserved.
            </small>
          </Col>

          {/* Right: tech stack badges */}
          <Col xs={12} md={6} className="text-center text-md-end">
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <TechBadge icon={<FaReact size={15} />} label="ReactJS" color="#61dafb" />
              <TechBadge icon={<SiRedux size={15} />} label="useContext" color="#764abc" />
              <TechBadge icon={<FaBootstrap size={15} />} label="Bootstrap" color="#7952b3" />
              <TechBadge icon={<SiAxios size={15} />} label="Axios" color="#5a29e4" />
              <TechBadge icon={<FaDatabase size={15} />} label="JSON Server" color="#f5a623" />
            </span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

function TechBadge({ icon, label, color }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        background: 'rgba(255,255,255,0.15)',
        borderRadius: '20px',
        padding: '3px 10px',
        fontSize: '0.78rem',
        fontWeight: 500,
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.25)',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ color }}>{icon}</span>
      {label}
    </span>
  );
}

export default AppFooter;
