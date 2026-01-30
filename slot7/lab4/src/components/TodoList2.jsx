// Exercise: Quản lý danh sách công việc với useReducer
import React, { useReducer, useState } from 'react';
import { Button, Container, Form, ListGroup } from 'react-bootstrap';

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload
        }
      ];
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);
    default:
      return state;
  }
}

function TodoList2() {
  const [tasks, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) {
      alert('Vui lòng nhập nội dung công việc!');
      return;
    }

    dispatch({ type: 'ADD_TASK', payload: inputValue.trim() });
    setInputValue('');
  };

  const handleDeleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  return (
    <div style={{
      backgroundColor: '#2c3e50',
      minHeight: '100vh',
      padding: '50px 20px'
    }}>
      <Container style={{ maxWidth: '700px' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '40px', textAlign: 'center' }}>
            Exercise: Todo List (useReducer)
          </h3>

          <Form onSubmit={handleAddTask} style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Form.Control
                type="text"
                placeholder="Nhập công việc mới..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{ 
                  padding: '12px', 
                  fontSize: '1rem',
                  flex: 1
                }}
              />
              <Button 
                variant="primary" 
                type="submit"
                style={{ 
                  padding: '12px 30px', 
                  fontSize: '1rem',
                  whiteSpace: 'nowrap'
                }}
              >
                Thêm
              </Button>
            </div>
          </Form>

          {tasks.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#999',
              fontSize: '1.1rem'
            }}>
              Chưa có công việc nào. Hãy thêm công việc mới!
            </div>
          ) : (
            <>
              <div style={{
                marginBottom: '15px',
                fontSize: '1rem',
                color: '#555',
                fontWeight: '600'
              }}>
                Danh sách công việc ({tasks.length})
              </div>
              <ListGroup>
                {tasks.map((task) => (
                  <ListGroup.Item
                    key={task.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '15px 20px',
                      marginBottom: '10px',
                      border: '1px solid #dee2e6',
                      borderRadius: '5px'
                    }}
                  >
                    <span style={{ 
                      fontSize: '1rem', 
                      color: '#2c3e50',
                      flex: 1,
                      wordBreak: 'break-word'
                    }}>
                      {task.text}
                    </span>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteTask(task.id)}
                      style={{ 
                        marginLeft: '15px',
                        padding: '5px 15px',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Xóa
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}

export default TodoList2;
