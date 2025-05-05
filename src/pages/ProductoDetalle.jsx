import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiUrl, headers } from "../config";
import "../styles/Productos.css";

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);
        // Intentar obtener el producto por id
        let response = await fetch(`${apiUrl}/productos/${id}`, { headers });
        let data;
        if (response.ok) {
          data = await response.json();
        } else {
          // Si falla, obtener todos y filtrar
          response = await fetch(`${apiUrl}/productos`, { headers });
          if (!response.ok) throw new Error("Producto no encontrado");
          const all = await response.json();
          data = all.find(p => String(p.id) === String(id));
          if (!data) throw new Error("Producto no encontrado");
        }
        setProducto(data);
      } catch (err) {
        setError("No se pudo cargar el producto.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducto();
  }, [id]);

  if (loading) return <div className="loading">Cargando producto...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!producto) return null;

  return (
    <div className="producto-detalle-container">
      <button className="quick-action" style={{marginBottom: '1.5rem'}} onClick={() => navigate(-1)}>
        ← Volver
      </button>
      <div className="producto-detalle-card">
        <img src={producto.imagen} alt={producto.nombre} className="producto-detalle-img" />
        <div className="producto-detalle-info">
          <h2 style={{color:'#ff0000'}}>{producto.nombre}</h2>
          <p><b>Marca:</b> {producto.marca}</p>
          <p><b>Categoría:</b> {producto.categoria}</p>
          <p><b>Precio:</b> <span style={{color:'#00b894', fontWeight:700}}>{producto.precio} €</span></p>
          <p><b>Stock:</b> {producto.stock} unidades</p>
          <p><b>Características:</b> {producto.caracteristicas}</p>
          <p><b>Descripción:</b> {producto.descripcion}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle; 