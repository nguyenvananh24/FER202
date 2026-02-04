// About.jsx - Trang giới thiệu về ứng dụng
import React from 'react';
import { Container, Card } from 'react-bootstrap';

function About() {
  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title as="h2" className="text-primary mb-4">About This Application</Card.Title>
          <Card.Text>
            <p>
              <strong>Welcome to our Online Quiz Application!</strong>
            </p>
            <p>
              This is a React-based web application built with React Router and React Bootstrap. 
              The application provides a user-friendly interface for taking quizzes and managing content.
            </p>
            <hr />
            <h5>Features:</h5>
            <ul>
              <li>Home page with interactive carousel</li>
              <li>News section with latest updates</li>
              <li>Quiz functionality for testing knowledge</li>
              <li>Contact form for user feedback</li>
              <li>Responsive design using Bootstrap</li>
            </ul>
            <hr />
            <h5>Technologies Used:</h5>
            <ul>
              <li>React.js</li>
              <li>React Router</li>
              <li>React Bootstrap</li>
              <li>JavaScript ES6+</li>
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default About;
