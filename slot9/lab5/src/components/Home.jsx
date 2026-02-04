// Trang giới thiệu (Home) chứa thông tin tác giả và carousel
import React from 'react';
import { Container, Card } from 'react-bootstrap';
import SlideBar from './SlideBar';

function Home() {
  return (
    <>
      {/* Carousel hiển thị slide ảnh full width */}
      <SlideBar />

      <Container className="mt-4">
        <h2 className="text-danger mb-3">This is Home Page</h2>

        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>1. Thông tin tác giả </Card.Title>
            <Card.Text>
              * <strong>Mã SV:</strong> HE187033 <br/>
              * <strong>Họ tên:</strong> Nguyễn Thị Vân Anh <br/>
              * <strong>GitHub:</strong> <a href="https://github.com/nguyenvananh24/FER202">Link Github</a>
            </Card.Text>
            <hr />
            <Card.Title>2. Cấu trúc project </Card.Title>
            <p>Project được tổ chức theo cấu trúc Component-based với React-Bootstrap.</p>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Home;