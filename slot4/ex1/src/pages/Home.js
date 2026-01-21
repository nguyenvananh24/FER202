import React from 'react';
import Header from '../components/Header';
import HeroCarousel from '../components/HeroCarousel';
import { banners } from '../data/bannerData';
import Footer from '../components/Footer';
import PizzaList from './pizzaList.jsx';
import BookingForm from '../components/Booking';

function Home() {
  return (
    <div>
      <Header />
      <HeroCarousel banners={banners} />
      <PizzaList />
      <BookingForm />
      <Footer myProfile={{
        name: "Van Anh",
        email: "vanhne@example.com",
        avatar: "/images/avt.jpg"
      }} />
    </div>
  );
}

export default Home;