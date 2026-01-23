import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import components
import NavigationBar from './components/Navbar';
import FlightBookingForm from './components/FlightBookingForm';
import LoginForm from './components/LoginForm';
import ManageUser from './components/UserManagement';

function App() {
  const appStyle = {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa'
  };

  return (
    <Router>
      <div style={appStyle}>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<FlightBookingForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/users" element={<ManageUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;