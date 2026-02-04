import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarPizza from './components/NavBarPizzar';
import Home from './components/Home';
import About from './components/About';
import NewPage from './pages/NewList';
import Quiz from './components/Quiz';
import Contact from './components/Contact';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <Router>
      {/* Thanh điều hướng cho ứng dụng */}
      <NavBarPizza />
      
      {/* Điều hướng ứng dụng với các liên kết đến các trang khác nhau */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<NewPage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>   
    </Router> 
  );
}

export default App;