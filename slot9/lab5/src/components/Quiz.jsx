// Quiz.jsx - Trang quiz chính
import React, { useState } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import { quizQuestions } from '../data/quizData';
import QuizQuestion from './QuizQuestion';

function Quiz() {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionId, answerIndex) => {
    if (!showResult) {
      setAnswers({
        ...answers,
        [questionId]: answerIndex
      });
    }
  };

  const handleSubmit = () => {
    // Tính điểm
    let correctCount = 0;
    quizQuestions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    setScore(correctCount);
    setShowResult(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResult(false);
    setScore(0);
  };

  const allQuestionsAnswered = quizQuestions.every(q => answers[q.id] !== undefined);

  return (
    <Container className="mt-4" style={{ maxWidth: '800px' }}>
      <h2 className="mb-4">Online Quiz</h2>
      
      {showResult && (
        <Alert variant={score >= quizQuestions.length * 0.7 ? "success" : "warning"}>
          <Alert.Heading>Quiz Completed!</Alert.Heading>
          <p>
            Your score: <strong>{score} / {quizQuestions.length}</strong>
            ({Math.round((score / quizQuestions.length) * 100)}%)
          </p>
        </Alert>
      )}

      {quizQuestions.map((question) => (
        <QuizQuestion
          key={question.id}
          question={question}
          selectedAnswer={answers[question.id]}
          onAnswerSelect={handleAnswerSelect}
          showResult={showResult}
        />
      ))}

      <div className="d-flex gap-2 mb-4">
        {!showResult ? (
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered}
          >
            Submit Answers
          </Button>
        ) : (
          <Button variant="secondary" onClick={handleReset}>
            Try Again
          </Button>
        )}
      </div>
    </Container>
  );
}

export default Quiz;
