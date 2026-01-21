//HeroCarousel.jsx dùng để tạo 1 carousel hiển thị các hình ảnh
import React from 'react';
import { Carousel } from 'react-bootstrap';
import { banners } from '../data/bannerData';

function HeroCarousel() {
  return (
    <div style={{ maxHeight: '500px', overflow: 'hidden' }}>
      <Carousel fade={true} interval={3000} pause="hover">
        {banners.map((banner, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={banner.image}
              alt={`Slide ${index + 1}`}
              style={{ 
                height: '500px', 
                objectFit: 'cover',
                filter: 'brightness(0.7)'
              }}
            />
            <Carousel.Caption style={{
              padding: '20px',
              bottom: '50px'
            }}>
              <h3 style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
              }}>{banner.title}</h3>
              <p style={{ 
                fontSize: '1.2rem',
                textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
              }}>{banner.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default HeroCarousel;