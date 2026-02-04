// SlideBar.jsx - Component Carousel hiển thị slide ảnh
import React from 'react';
import { Carousel } from 'react-bootstrap';
import { slideImages } from '../data/slideImages';

function SlideBar() {
  return (
    <Carousel className="mb-4">
      {slideImages.map((slide, index) => (
        <Carousel.Item key={slide.id}>
          <img
            className="d-block w-100"
            src={slide.image}
            alt={`Slide ${index + 1}`}
            style={{ height: '400px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3>{slide.title}</h3>
            <p>{slide.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default SlideBar;
