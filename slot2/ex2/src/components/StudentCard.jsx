import './StudentCard.css';

function StudentCard({ student }) {
    const handleImageError = (e) => {
        // Fallback image nếu ảnh không load được
        e.target.src = "https://via.placeholder.com/150x150/007bff/ffffff?text=" + student.name.charAt(0);
    };

    return (
        <div className="student-card">
            <div className="student-avatar">
                <img 
                    src={student.avatar} 
                    alt={student.name}
                    onError={handleImageError}
                />
            </div>
            <div className="student-info">
                <h3 className="student-name">{student.name}</h3>
                <div className="student-details">
                    <p><span className="label">ID:</span> {student.id}</p>
                    <p><span className="label">Tuổi:</span> {student.age}</p>
                    <p><span className="label">Điểm:</span> 
                        <span className={`grade ${student.grade >= 8 ? 'excellent' : student.grade >= 6.5 ? 'good' : 'average'}`}>
                            {student.grade}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default StudentCard;
