// NewList.jsx - Trang hiển thị danh sách tin tức sử dụng NewsCard component
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NewsCard from '../components/NewsCard';
import SlideBar from '../components/SlideBar';
import { newsList } from '../data/newsData';

function NewList() {
  return (
    <>
      {/* Carousel ở đầu trang */}
      <SlideBar />
      
      {/* Danh sách tin tức */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Latest News</h2>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {newsList.map((news) => (
            <Col key={news.id}>
              <NewsCard news={news} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default NewList;
