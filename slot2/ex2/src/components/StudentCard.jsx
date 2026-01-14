import { Card, Button } from 'react-bootstrap';

function StudentCard({ student }) {
    return (
        <Card className="h-100 ma">
            <Card.Img variant="top" src={student.avatar} />
            <Card.Body>
                <Card.Title>{student.name}</Card.Title>
                <Card.Text>Grade: {student.grade}</Card.Text>
                <Card.Text>Age: {student.age}</Card.Text>
                <Button variant="primary">View Details</Button>
            </Card.Body>
        </Card>
    );
}

export default StudentCard;
