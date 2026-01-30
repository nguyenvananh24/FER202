// Exercise 4: Todo List Component
import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputValue }]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#2c3e50', 
      minHeight: '100vh',
      padding: '50px 20px'
    }}>
      <Container style={{ maxWidth: '900px' }}>
        <Row>
          {/* Cột trái - Input */}
          <Col md={6} className="mb-4">
            <div style={{ display: 'flex', gap: '10px' }}>
              <Form.Control
                type="text"
                placeholder="Please input a Task"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{ 
                  flex: 1,
                  padding: '10px 15px',
                  fontSize: '1rem'
                }}
              />
              <Button 
                variant="danger" 
                onClick={handleAddTodo}
                style={{ padding: '10px 25px' }}
              >
                Add Todo
              </Button>
            </div>
          </Col>

          {/* Cột phải - Todo List */}
          <Col md={6}>
            <Card style={{ backgroundColor: 'white' }}>
              <Card.Body>
                <Card.Title style={{ 
                  textAlign: 'center',
                  marginBottom: '20px',
                  fontWeight: 'bold'
                }}>
                  Todo List
                </Card.Title>
                
                {todos.length === 0 ? (
                  <div style={{ 
                    textAlign: 'center', 
                    color: '#7f8c8d',
                    padding: '20px'
                  }}>
                    Chưa có công việc nào
                  </div>
                ) : (
                  <div>
                    {todos.map((todo) => (
                      <div
                        key={todo.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '10px 15px',
                          borderBottom: '1px solid #e0e0e0',
                          backgroundColor: 'white'
                        }}
                      >
                        <span style={{ flex: 1 }}>{todo.text}</span>
                        <Button 
                          variant="danger" 
                          size="sm"
                          onClick={() => handleDeleteTodo(todo.id)}
                          style={{ marginLeft: '10px' }}
                        >
                          Delete
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TodoList;
