// QuizQuestion.jsx - Component hiển thị từng câu hỏi
import React from 'react';
import { Card, Form } from 'react-bootstrap';

function QuizQuestion({ question, selectedAnswer, onAnswerSelect, showResult }) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
          {question.id}. {question.question}
        </Card.Title>
        <Form>
          {question.options.map((option, index) => {
            const isCorrect = index === question.correctAnswer;
            const isSelected = selectedAnswer === index;
            
            let className = '';
            if (showResult) {
              if (isCorrect) {
                className = 'text-success fw-bold';
              } else if (isSelected && !isCorrect) {
                className = 'text-danger';
              }
            }

            return (
              <Form.Check
                key={index}
                type="radio"
                id={`q${question.id}-option${index}`}
                name={`question${question.id}`}
                label={option}
                checked={selectedAnswer === index}
                onChange={() => onAnswerSelect(question.id, index)}
                disabled={showResult}
                className={className}
                style={{ marginBottom: '10px', fontSize: '1rem' }}
              />
            );
          })}
        </Form>
        {showResult && selectedAnswer !== null && (
          <div className="mt-3">
            {selectedAnswer === question.correctAnswer ? (
              <span className="text-success">✓ Correct!</span>
            ) : (
              <span className="text-danger">✗ Incorrect. Correct answer: {question.options[question.correctAnswer]}</span>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default QuizQuestion;
