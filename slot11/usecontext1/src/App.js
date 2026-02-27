import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";

import NavbarMenu from "./components/NavbarMenu";
import Exercise1 from "./pages/Exercise1";
import Exercise2 from "./pages/Exercise2";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>

          <NavbarMenu />

          <Routes>
            <Route path="/" element={<Exercise1 />} />
            <Route path="/login" element={<Exercise2 />} />
          </Routes>

        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;