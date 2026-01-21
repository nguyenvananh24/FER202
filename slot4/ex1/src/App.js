import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import { banners } from './data/bannerData';
import Footer from './components/Footer';
import PizzaList from './pages/pizzaList';
import Booking from './components/Booking';

function App() {
  return (
    <div className="App">
      <Header />
      <HeroCarousel banners={banners} />
      <PizzaList />
      <Booking />
      <Footer myProfile={{
        name: "Van Anh",
        email: "vanhne@example.com",
        avatar: "/images/avt.jpg"
      }} />
    </div>
  );
}

export default App;