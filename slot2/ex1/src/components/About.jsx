//khai báo 1 đối tượng student với các thuộc tính: id, name, avatar, age, grade  
//in thông tin của h1, p và img sử dụng các thuộc tính của đối tượng student
function About() {
    const student = {
        id: 1,
        name: "van anh",
        avatar: "/images/student1.jpg",
        age: 21,
        grade: 9.5
    };
    console.log(student);
    return (
        <>
            <h1>Thông tin sinh viên</h1>
            <p>ID: {student.id}</p>
            <p>Tên: {student.name}</p>
            <p>Tuổi: {student.age}</p>
            <p>Điểm: {student.grade}</p>
            <img src={student.avatar} alt="avatar" />
        </>
    );
}
export default About;