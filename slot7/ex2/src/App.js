import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductQuantity from './components/ProductQuantity';
import OrderProcessing from './components/OrderProcessing';

function App() {
  return (
    <div className="App">
      <ProductQuantity />
      <hr />
      <OrderProcessing />
    </div>
  );
}

export default App;
