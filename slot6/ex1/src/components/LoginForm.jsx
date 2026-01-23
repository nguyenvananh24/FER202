import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      alert(`Login successful!\nUsername: ${username}`);
      // Reset form
      setUsername("");
      setPassword("");
    } else {
      alert("Please fill in all fields!");
    }
  };

  const handleCancel = () => {
    setUsername("");
    setPassword("");
  };

  const containerStyle = {
    padding: "40px 20px",
    minHeight: "calc(100vh - 80px)",
    display: "flex",
    alignItems: "center",
  };

  const cardStyle = {
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
    border: "none",
  };

  return (
    <Container style={containerStyle}>
      <Row className="justify-content-center w-100">
        <Col md={4}>
          <Card style={cardStyle}>
            <Card.Body style={{ padding: "40px" }}>
              <Card.Title
                className="text-center mb-4"
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "600",
                  color: "#2c3e50",
                }}
              >
                🔐 Login
              </Card.Title>

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label
                    style={{ fontWeight: "500", color: "#34495e" }}
                  >
                    Username
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{
                      borderRadius: "10px",
                      padding: "12px",
                      border: "2px solid #e9ecef",
                      fontSize: "1rem",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label
                    style={{ fontWeight: "500", color: "#34495e" }}
                  >
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      borderRadius: "10px",
                      padding: "12px",
                      border: "2px solid #e9ecef",
                      fontSize: "1rem",
                    }}
                  />
                </Form.Group>

                <div className="d-flex justify-content-between">
                  <Button
                    variant="primary"
                    type="submit"
                    style={{
                      borderRadius: "25px",
                      padding: "10px 25px",
                      fontWeight: "500",
                      fontSize: "1rem",
                    }}
                  >
                    🚀 Login
                  </Button>

                  <Button
                    variant="secondary"
                    type="button"
                    onClick={handleCancel}
                    style={{
                      borderRadius: "25px",
                      padding: "10px 25px",
                      fontWeight: "500",
                      fontSize: "1rem",
                    }}
                  >
                    ❌ Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
