import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import ProductQuantity from './components/ProductQuantity';
import ProductQuantity2 from './components/ProductQuantity2';
import OrderProcessing from './components/OrderProcessing';
import OrderProcessing2 from './components/OrderProcessing2';
import ProductForm from './components/ProductForm';
import ProductForm2 from './components/ProductForm2';
import TodoList from './components/TodoList';
import TodoList2 from './components/TodoList2';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Navigate to="/ex1" replace />} />
          <Route path="/ex1" element={<ProductQuantity />} />
          <Route path="/ex1-reducer" element={<ProductQuantity2 />} />
          <Route path="/ex2" element={<OrderProcessing />} />
          <Route path="/ex2-reducer" element={<OrderProcessing2 />} />
          <Route path="/ex3" element={<ProductForm />} />
          <Route path="/ex3-reducer" element={<ProductForm2 />} />
          <Route path="/ex4" element={<TodoList />} />
          <Route path="/ex4-reducer" element={<TodoList2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
