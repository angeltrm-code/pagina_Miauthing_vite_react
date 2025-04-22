<<<<<<< HEAD
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Comunidad from "./pages/Comunidad";
import Soporte from "./pages/Soporte";
import Contacto from "./pages/Contacto";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/comunidad" element={<Comunidad />} />
          <Route path="/soporte" element={<Soporte />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
=======
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
>>>>>>> 9853fd3627d961828286247ddc2a0e186dfd14b5
  );
}

export default App;
