import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//Component hiển thị thông tin của 1 student trong Card component
function About({ student }) {
    const defaultStudent = {
        id: 1,
        name: "Nguyễn Văn Anh",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=face",
        age: 21,
        grade: 9.5
    };
    
    const studentData = student || defaultStudent;
    console.log(studentData);
    
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={studentData.avatar} style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Body>
                <Card.Title>{studentData.name}</Card.Title>
                <Card.Text>
                    <strong>ID:</strong> {studentData.id}<br/>
                    <strong>Tuổi:</strong> {studentData.age} tuổi<br/>
                    <strong>Điểm:</strong> <span 
                        style={{
                            color: studentData.grade >= 8 ? '#28a745' : studentData.grade >= 6.5 ? '#ffc107' : '#dc3545',
                            fontWeight: 'bold'
                        }}
                    >
                        {studentData.grade}
                    </span>
                </Card.Text>
                <Button variant="primary">Xem chi tiết</Button>
            </Card.Body>
        </Card>
    );
}

export default About;