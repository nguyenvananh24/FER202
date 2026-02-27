import React from 'react';
import { Container } from 'react-bootstrap';
import { MovieProvider } from '../contexts/MovieContext';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';
import Header from '../components/Header';

const MovieManager = () => (
  <MovieProvider>
    <Header />
    <Container className="mt-4">
      <h1 className="text-center mb-4">🎬 Quản lý Phim</h1>
      <MovieForm />
      <MovieTable />
    </Container>
  </MovieProvider>
);

export default MovieManager;