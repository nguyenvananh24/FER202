const x =5;
//console.log("The value of x is:", x);
console.log(`The value of x is: ${x}`);
//kiểm tra x có phải số âm hay số dương
if (x >= 0) {
    console.log(`${x} là số dương`);
} else {
    console.log(`${x} là số âm`);
}

//có 2 tham số nhập vào tên tuổi và in ra
const printNameAge = (name, age) => {
    console.log(`Tên tôi là ${name}, tôi ${age} tuổi`);
}
printNameAge("van anh", 21);

//viết arrow function có 2 tham số nhập vào tên tuổi và in ra, viết hàm greet
const greet = (name, age) => {
    return `Xin chào, tôi là ${name}, tôi ${age} tuổi`;
}
console.log(greet("van anh", 21));

// mặc định tuổi = 18
const greetWithDefaultAge = (name, age = 18) => {
    return `Xin chào, tôi là ${name}, tôi ${age} tuổi`;
}
console.log(greetWithDefaultAge("van anh"));

//viết hàm tính bình phương cua một số x
const square = (x) => {
    return x * x;
}
console.log(`Bình phương của ${x} là ${square(x)}`);

//viết hàm in 1 dôi tượng student gồm các thuộc tính: name, age, grade, id
const printStudentInfo = (student) => {
    console.log(`Tên: ${student.name}`);
    console.log(`Tuổi: ${student.age}`);
    console.log(`Điểm: ${student.grade}`);
    console.log(`ID: ${student.id}`);
}
const student = {name: "van anh", age: 21, grade: 9.5, id: 1};
printStudentInfo(student);

//khai báo một list student, và gọi hàm printStudentInfo cho từng student trong list
const students = [
    {name: "van anh", age: 21, grade: 9.5, id: 1},
    {name: "minh", age: 22, grade: 8.0, id: 2},
    {name: "hoa", age: 20, grade: 7.5, id: 3}
];
students.forEach(student => printStudentInfo(student)); 

//khai báo một list student, không gọi hàm printStudentInfo
const students2 = [
    {name: "lan", age: 23, grade: 8.5, id: 4},
    {name: "huy", age: 21, grade: 9.0, id: 5},
    {name: "anh", age: 22, grade: 7.0, id: 6},
    {name: "tuan", age: 24, grade: 6.5, id: 7}
];
students2.forEach(student => {
    console.log(`Tên: ${student.name}, Tuổi: ${student.age}, Điểm: ${student.grade}, ID: ${student.id}`);
});

//cách khác dùng map để in thông tin student
students2.map(student => {
    console.log(`Tên: ${student.name}, Tuổi: ${student.age}, Điểm: ${student.grade}, ID: ${student.id}`);
});

// sử dụng destructuring để lấy các thuộc tính của student
students2.forEach(({name, age, grade, id}) => {
    console.log(`Tên: ${name}, Tuổi: ${age}, Điểm: ${grade}, ID: ${id}`);
});

//dùng map
students2.map(({name, age, grade, id}) => {
    console.log(`Tên: ${name}, Tuổi: ${age}, Điểm: ${grade}, ID: ${id}`);
});

//dùng rest operator để lấy phần còn lại của mảng student
const [firstStudent, secondStudent, ...restStudents] = students2;
console.log("First Student:", firstStudent);
console.log("Second Student:", secondStudent);
console.log("Rest Students:", restStudents);

restStudents.map(({name, age, grade, id}) => {
    console.log(`Tên: ${name}, Tuổi: ${age}, Điểm: ${grade}, ID: ${id}`);
}); 

//thêm 1 student mới vào restStudents sử dụng pread operator
const newStudent = {name: "linh", age: 19, grade: 9.2, id: 8};
const newStudentList = [...restStudents, newStudent];
newStudentList.map(({name, age, grade, id}) => {
    console.log(`Tên: ${name}, Tuổi: ${age}, Điểm: ${grade}, ID: ${id}`);
});
