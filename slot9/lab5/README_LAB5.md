# Lab 5: Online Quiz Application - React Router

## Mô tả dự án
Ứng dụng Quiz trực tuyến được xây dựng bằng React, React Router và React Bootstrap với các tính năng đầy đủ theo yêu cầu Lab 5.

## Các tính năng đã hoàn thành

### ✅ 1. React Router Navigation
- **Home Page**: Trang chủ với carousel slide 3 ảnh và thông tin tác giả
- **About Page**: Giới thiệu về ứng dụng
- **News Page**: Hiển thị danh sách tin tức với layout grid
- **Quiz Page**: Trang quiz với câu hỏi và đáp án
- **Contact Page**: Form liên hệ với validation đầy đủ

### ✅ 2. Home Page - Carousel
- Hiển thị carousel với 3 slides
- Tự động chuyển slide
- Caption cho mỗi slide
- Responsive design

### ✅ 3. News Page
- Hiển thị danh sách tin tức dạng grid (4 cột)
- Mỗi tin tức có:
  - Hình ảnh
  - Tiêu đề
  - Mô tả ngắn
  - Link "Read more"
- Dữ liệu lưu trong array

### ✅ 4. Quiz Page
- Hiển thị danh sách câu hỏi
- Mỗi câu hỏi có 4 lựa chọn
- Sử dụng component riêng (QuizQuestion) để hiển thị từng câu hỏi
- Tính điểm và hiển thị kết quả
- Hiển thị đáp án đúng/sai sau khi submit

### ✅ 5. Contact Page
- Form validation đầy đủ với React Bootstrap
- Các trường: First name, Last name, Username, City, State, Zip
- Checkbox "Agree to terms and conditions"
- Validation message cho từng trường
- Success feedback khi nhập đúng
- Error feedback khi nhập sai

## Cấu trúc thư mục

```
src/
├── components/
│   ├── Home.jsx              # Trang chủ với carousel
│   ├── About.jsx             # Trang giới thiệu
│   ├── NewsCard.jsx          # Component hiển thị một tin tức
│   ├── Quiz.jsx              # Trang quiz chính
│   ├── QuizQuestion.jsx      # Component hiển thị câu hỏi
│   ├── Contact.jsx           # Trang liên hệ
│   ├── RegisterForm.jsx      # Form đăng ký
│   ├── NavBarPizzar.jsx      # Navigation bar
│   └── SlideBar.jsx          # Component carousel
├── pages/
│   └── NewList.jsx           # Trang danh sách tin tức
├── data/
│   ├── newsData.js           # Dữ liệu tin tức
│   ├── quizData.js           # Dữ liệu câu hỏi
│   └── slideImages.js        # Dữ liệu ảnh carousel
├── App.js                    # Component chính với routing
└── index.js                  # Entry point

public/
└── images/
    ├── slide1.jpg            # Ảnh carousel 1
    ├── slide2.jpg            # Ảnh carousel 2
    ├── slide3.jpg            # Ảnh carousel 3
    └── ...                   # Các ảnh khác
```

## Routes

| Path | Component | Mô tả |
|------|-----------|-------|
| `/` | Home | Trang chủ với carousel |
| `/about` | About | Giới thiệu ứng dụng |
| `/news` | NewPage (NewList) | Danh sách tin tức |
| `/quiz` | Quiz | Trang quiz |
| `/contact` | Contact | Form liên hệ |
| `/register` | RegisterForm | Form đăng ký |

## Navigation Bar

Navigation bar bao gồm các link:
- **Home**: Trang chủ
- **About**: Giới thiệu
- **News**: Tin tức
- **Quiz**: Quiz
- **Contact**: Liên hệ
- **Đăng ký**: Form đăng ký

## Công nghệ sử dụng

- **React**: ^18.x
- **React Router DOM**: ^6.x
- **React Bootstrap**: ^2.x
- **Bootstrap**: ^5.x

## Hướng dẫn chạy ứng dụng

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy ứng dụng:
```bash
npm start
```

3. Mở trình duyệt tại: `http://localhost:3000`

## Tính năng nổi bật

### 1. Carousel trên Home Page
- 3 slides với ảnh đẹp mắt
- Tự động chuyển slide
- Caption có thể tùy chỉnh
- Responsive với mọi kích thước màn hình

### 2. News Grid Layout
- Layout 4 cột responsive
- Card design đẹp mắt với shadow
- Hover effect
- Dữ liệu động từ array

### 3. Quiz với Component riêng
- QuizQuestion component tái sử dụng
- Hiển thị kết quả realtime
- Tính điểm tự động
- Hiển thị đáp án đúng/sai với màu sắc

### 4. Form Validation mạnh mẽ
- Validation realtime
- Success/Error feedback
- Bootstrap validation styling
- User-friendly messages

## Tác giả

- **Mã SV**: PS12345
- **Họ tên**: traltb
- **GitHub**: [Link Github](https://github.com/traltb-byte/FER202)

## Lưu ý

- Project sử dụng React Bootstrap để tạo UI đẹp và responsive
- Tất cả các route đều được cấu hình với React Router v6
- Form validation tuân thủ best practices của Bootstrap
- Code được tổ chức theo component-based architecture
