import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import ProductQuantity from './components/ProductQuantity';
import OrderProcessing from './components/OrderProcessing';
import ProductForm from './components/ProductForm';
import TodoList from './components/TodoList';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Navigate to="/ex1" replace />} />
          <Route path="/ex1" element={<ProductQuantity />} />
          <Route path="/ex2" element={<OrderProcessing />} />
          <Route path="/ex3" element={<ProductForm />} />
          <Route path="/ex4" element={<TodoList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
