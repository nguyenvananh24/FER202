import StudentCard from './StudentCard';

import Card from './Card';

//khai báo 1 đối tượng student với các thuộc tính: id, name, avatar, age, grade  
//sử dụng thẻ Card với style để hiển thị thông tin
function About() {
    const student = {
        id: 1,
        name: "van anh",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        age: 21,
        grade: 9.5
    };
    console.log(student);
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '20px'
        }}>
            <div>
                <h1 style={{ 
                    color: 'white', 
                    textAlign: 'center', 
                    marginBottom: '30px',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}>
                    Thông tin sinh viên
                </h1>
                <Card style={{ 
                    width: '350px', 
                    borderRadius: '12px', 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    padding: '20px',
                    textAlign: 'center'
                }}>
                    <div style={{ marginBottom: '15px' }}>
                        <img 
                            src={student.avatar} 
                            alt={student.name}
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '3px solid #f0f0f0'
                            }}
                        />
                    </div>
                    <h3 style={{ 
                        color: '#333', 
                        marginBottom: '15px',
                        fontSize: '1.4em',
                        fontWeight: '600',
                        textTransform: 'capitalize'
                    }}>
                        {student.name}
                    </h3>
                    <div style={{ textAlign: 'left' }}>
                        <p style={{ margin: '8px 0', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: '600', color: '#333' }}>ID:</span> 
                            <span>{student.id}</span>
                        </p>
                        <p style={{ margin: '8px 0', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: '600', color: '#333' }}>Tuổi:</span> 
                            <span>{student.age}</span>
                        </p>
                        <p style={{ margin: '8px 0', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: '600', color: '#333' }}>Điểm:</span> 
                            <span style={{
                                fontWeight: 'bold',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                backgroundColor: student.grade >= 8 ? '#d4edda' : student.grade >= 6.5 ? '#fff3cd' : '#f8d7da',
                                color: student.grade >= 8 ? '#155724' : student.grade >= 6.5 ? '#856404' : '#721c24'
                            }}>
                                {student.grade}
                            </span>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
export default About;