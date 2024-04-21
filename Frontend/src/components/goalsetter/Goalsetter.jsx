import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const courseData = [
  {
    id: 1,
    title: 'Introduction to React',
    duration: '4 weeks',
    description: 'Learn the basics of React.js and how to build web applications with it.',
  },
  {
    id: 2,
    title: 'Advanced React',
    duration: '6 weeks',
    description: 'Dive deeper into React.js concepts and explore advanced topics.',
  },
  // Add more courses as needed
];

const Goalsetter = () => {
  const [goals, setGoals] = useState({});
  const [timeline, setTimeline] = useState({});

  const handleGoalChange = (courseId, goal) => {
    setGoals(prevGoals => ({
      ...prevGoals,
      [courseId]: goal,
    }));
  };

  const handleTimelineChange = (courseId, timeline) => {
    setTimeline(prevTimeline => ({
      ...prevTimeline,
      [courseId]: timeline,
    }));
  };

  const handleSubmit = () => {
    // You can handle the submission of goals and timelines here
    console.log('Goals:', goals);
    console.log('Timeline:', timeline);
  };

  return (
    <Container>
      <h1>Goal Setter for Courses</h1>
      <Row>
        {courseData.map(course => (
          <Col key={course.id} xs={12} md={6}>
            <h2>{course.title}</h2>
            <p><strong>Duration:</strong> {course.duration}</p>
            <p>{course.description}</p>
            <Form.Group controlId={`goal-${course.id}`}>
              <Form.Label>Goal for this Course</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={goals[course.id] || ''}
                onChange={e => handleGoalChange(course.id, e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId={`timeline-${course.id}`}>
              <Form.Label>Timeline for this Course</Form.Label>
              <Form.Control
                type="text"
                value={timeline[course.id] || ''}
                onChange={e => handleTimelineChange(course.id, e.target.value)}
              />
            </Form.Group>
          </Col>
        ))}
      </Row>
      <Button onClick={handleSubmit}>Submit</Button>
    </Container>
  );
};

export default Goalsetter;
