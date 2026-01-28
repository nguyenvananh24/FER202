//Component dùng để test useState, có form gồm username và age. Nhấn nút Submit
//sẽ thay đổi giá trị hiển thị bên dưới trên label
import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
function TestUseState() {
    const [username, setUsername] = useState('anhnv');
    const [age, setAge] = useState(18);
    const [submittedUsername, setSubmittedUsername] = useState('');
    const [submittedAge, setSubmittedAge] = useState('');

   //xử lý sự kiện nhấn nút submit, hiển thị message bên dưới, dùng useState để xử lý thay đỏi giá trị

   const handleSubmit = () => {
       setSubmittedUsername(username);
       setSubmittedAge(age);
   };

   return (
     <div>
       <h2>Test useState Hook</h2>
       {/* Form nhập username và age, gồm Container có 4 dòng 2 cột sử dụng React-Bootstrap */}
       <Container>
         {/* Dòng 1, 2 cột: Username label, textbox */}
         <Row className="mb-3">
           <Col md={2}>
             <label htmlFor="username" className="form-label">Username:</label>
           </Col>
            <Col md={4}>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={2}>
            <label htmlFor="age" className="form-label">Age:</label>
            </Col>
            <Col md={4}>
            <input
              type="number"
                id="age"
                className="form-control"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Button variant="primary" onClick={handleSubmit}> Submit</Button>
          </Col>
        </Row>
        {submittedUsername && (
          <Row className="mb-3">
            <Col md={6}>
              <label className="form-label">Hello, {submittedUsername}. You are {submittedAge} years old.</label>
            </Col>
          </Row>
        )}
        </Container>
    </div>
    );
  }
  export default TestUseState;