import React, { useReducer } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Alert,
  Spinner
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import ConfirmModal from "./ConfirmModal";

const initialFormState = {
  identifier: "",
  password: "",
  errors: {},
  showSuccessModal: false
};

function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };

    case "SET_ERRORS":
      return { ...state, errors: action.errors };

    case "SHOW_MODAL":
      return { ...state, showSuccessModal: true };

    case "HIDE_MODAL":
      return { ...state, showSuccessModal: false };

    case "RESET":
      return initialFormState;

    default:
      return state;
  }
}

function LoginForm() {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const { login, loading, error, clearError, user } = useAuth();

  const validate = () => {
    const errs = {};
    if (!formState.identifier) errs.identifier = "Required";
    if (!formState.password) errs.password = "Required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    const errs = validate();
    dispatch({ type: "SET_ERRORS", errors: errs });

    if (Object.keys(errs).length > 0) return;

    const result = await login(formState.identifier, formState.password);

    if (result.ok) dispatch({ type: "SHOW_MODAL" });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header className="text-center">
              Login with AuthContext
            </Card.Header>

            <Card.Body>
              {error && (
                <Alert variant="danger" onClose={clearError} dismissible>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username or Email</Form.Label>
                  <Form.Control
                    value={formState.identifier}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_FIELD",
                        field: "identifier",
                        value: e.target.value
                      })
                    }
                    isInvalid={!!formState.errors.identifier}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={formState.password}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_FIELD",
                        field: "password",
                        value: e.target.value
                      })
                    }
                    isInvalid={!!formState.errors.password}
                  />
                </Form.Group>

                <Button type="submit" disabled={loading} className="w-100">
                  {loading ? <Spinner size="sm" /> : "Login"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ConfirmModal
        show={formState.showSuccessModal}
        title="Login Success"
        message={`Welcome ${user?.username}`}
        onConfirm={() => dispatch({ type: "HIDE_MODAL" })}
        onHide={() => dispatch({ type: "HIDE_MODAL" })}
      />
    </Container>
  );
}

export default LoginForm;