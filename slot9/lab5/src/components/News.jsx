// News.jsx - Trang hiển thị danh sách tin tức
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { newsList } from '../data/newsData';
import NewsCard from './NewsCard';

function News() {
  return (
    <Container className="mt-4">
      <h2 className="text-danger mb-4">News Category</h2>
      <Row>
        {newsList.map((news) => (
          <Col md={6} lg={3} key={news.id} className="mb-4">
            <NewsCard news={news} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default News;
