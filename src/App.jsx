import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Comunidad from "./pages/Comunidad";
import Soporte from "./pages/Soporte";
import Contacto from "./pages/UneteANosotros";
import Dashboard from "./pages/Dashboard";
import DashboardCliente from "./pages/DashboardCliente";
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import ProductoDetalle from "./pages/ProductoDetalle";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/comunidad" element={<Comunidad />} />
            <Route path="/soporte" element={<Soporte />} />
            <Route path="/unete-a-nosotros" element={<Contacto />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard-cliente" element={<DashboardCliente />} />
            <Route path="/productos/:id" element={<ProductoDetalle />} />
          </Routes>
        </main>
        <Cart />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
