import { Container, Row, Col } from 'react-bootstrap';
import About from './About';
import listOfStudent from '../listOfStudent';

function StudentList() {
    return (
        <Container fluid style={{ 
            backgroundColor: '#f8f9fa', 
            minHeight: '100vh', 
            padding: '20px' 
        }}>
            <h1 className="text-center mb-4" style={{ color: '#333' }}>
                Danh sách sinh viên
            </h1>
            <Row>
                {listOfStudent.map((student) => (
                    <Col key={student.id} lg={4} md={6} sm={12} className="mb-4">
                        <About student={student} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default StudentList;
