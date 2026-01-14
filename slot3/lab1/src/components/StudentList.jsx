//StudentList.jsx dùng để hiển thị danh sách sinh viên, dữ liệu các sinh viên được lấy từ đối tượng studentData.js
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { studentList } from '../data/studentData';

//Component hiển thị danh sách sinh viên
function StudentList() {
    return (
        //dùng Container Bootstrap và map để in ra danh sách sinh viên trong studentList
        <Container className="mt-4">
            <h1 className="text-center mb-4">Danh sách sinh viên</h1>
            <Row>
                {studentList.map((student) => (
                    <Col key={student.id} lg={4} md={6} sm={12} className="mb-4">
                        <Card className="h-100">
                            <Card.Img variant="top" src={student.avatar} style={{ height: '200px', objectFit: 'cover' }} />
                            <Card.Body>
                                <Card.Title>{student.name}</Card.Title>
                                <Card.Text>
                                    <strong>ID:</strong> {student.id}<br/>
                                    <strong>Year of Birth:</strong> {student.yob}<br/>
                                    <strong>Grade:</strong> {student.grade}
                                </Card.Text>
                                <Button variant="primary">Xem chi tiết</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>  
    );
}

export default StudentList;
