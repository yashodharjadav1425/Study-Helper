import React, { useState } from 'react';
import { Container, Button, Card, ListGroup, Row, Col } from 'react-bootstrap';

const questions = [
  {
    question: 'What is the capital of France?',
    options: ['A. London', 'B. Paris', 'C. Rome', 'D. Madrid'],
    correctAnswer: 'B'
  },
  {
    question: 'What is the largest mammal?',
    options: ['A. Elephant', 'B. Blue Whale', 'C. Giraffe', 'D. Lion'],
    correctAnswer: 'B'
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['A. Venus', 'B. Mars', 'C. Jupiter', 'D. Saturn'],
    correctAnswer: 'B'
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption('');
    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  return (
    <Container>
      <center><br/><h2>Quiz</h2></center>
      {currentQuestion < questions.length ? (
        <Card style={{ width: '40rem', margin: 'auto', marginTop: '2rem', textAlign: 'center' }}>
          <Card.Body>
            <Card.Title>{questions[currentQuestion].question}</Card.Title>
            <ListGroup variant="flush">
              <Row>
                {questions[currentQuestion].options.map((option, index) => (
                  <Col xs={6} key={index}>
                    <ListGroup.Item style={{ padding: '0.5rem 0' }}>
                      <Button
                        variant={option[0] === selectedOption ? 'primary' : 'outline-primary'}
                        onClick={() => handleOptionSelect(option[0])}
                        block
                        style={{ height: '100%', width: '100%' }}
                      >
                        {option}
                      </Button>
                    </ListGroup.Item>
                  </Col>
                ))}
              </Row>
            </ListGroup>
            <Button onClick={handlePreviousQuestion} style={{ marginRight: '1rem' }} disabled={currentQuestion === 0}>Previous</Button>
            <Button onClick={handleNextQuestion}>Next</Button>
          </Card.Body>
        </Card>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h1>Quiz Completed!</h1>
          <p>Your score is: {score} out of {questions.length}</p>
        </div>
      )}
    </Container>
  );
};

export default Quiz;
