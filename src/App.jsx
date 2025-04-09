import './styles/Inicio.css';  // Ahora importa Inicio.css
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import Productos from './components/Productos';
import Comunidad from './components/Comunidad';
import Soporte from './components/Soporte';
import Contacto from './components/Contacto';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/comunidad" element={<Comunidad />} />
        <Route path="/soporte" element={<Soporte />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
