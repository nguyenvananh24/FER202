// NewsCard.jsx - Component hiển thị một tin tức
import React from 'react';
import { Card } from 'react-bootstrap';

function NewsCard({ news }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img 
        variant="top" 
        src={news.images} 
        alt={news.title}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title style={{ fontSize: '1rem', minHeight: '60px' }}>
          {news.title}
        </Card.Title>
        <Card.Text style={{ fontSize: '0.9rem', color: '#666' }}>
          {news.description}
        </Card.Text>
        <a 
          href="#" 
          className="mt-auto text-primary"
          style={{ textDecoration: 'none' }}
          onClick={(e) => e.preventDefault()}
        >
          Read more →
        </a>
      </Card.Body>
    </Card>
  );
}

export default NewsCard;
