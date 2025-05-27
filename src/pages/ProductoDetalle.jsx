import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiUrl, headers } from "../config";
import "../styles/Productos.css";
import "../styles/ProductDetail.css";

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
        setError(null);

        let response = await fetch(`${apiUrl}/productos/${id}`, { headers });
        let data;
        
        if (response.ok) {
          data = await response.json();
          if (Array.isArray(data)) {
             data = data.find(p => String(p.id) === String(id));
             if (!data) throw new Error("Producto no encontrado");
          }
          else if (!data) {
               throw new Error("Producto no encontrado");
          }
        } else {
          response = await fetch(`${apiUrl}/productos`, { headers });
          
          if (!response.ok) throw new Error(`Error del servidor: ${response.status}`);

          const all = await response.json();
          data = all.find(p => String(p.id) === String(id));

          if (!data) throw new Error("Producto no encontrado");
        }
        
        setProducto(data);
      } catch (err) {
        console.error('Error al cargar el producto:', err);
        setError('No se pudo cargar el producto. Por favor, intente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id, apiUrl]);

  if (loading) {
     return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error) {
     return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <p className="error-message">{error}</p>
        <button 
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!producto) {
     return (
       <div className="error-container">
         <div className="error-icon">⚠️</div>
         <p className="error-message">Producto no encontrado.</p>
       </div>
     );
  }

  return (
    <main className="main-product-detail">
      <div className="product-detail-container">
        <div className="product-detail-image">
          <img 
            src={producto.imagen} 
            alt={producto.nombre}
            onError={(e) => {
              e.target.src = '/images/products/default-image.svg';
            }}
          />
        </div>
        
        <div className="product-detail-info">
          <div className="product-detail-header">
            <h2>{producto.nombre}</h2>
            <div className="product-brand">
              <span className="brand-label">Marca:</span> {producto.marca}
            </div>
          </div>
          
          <div className="product-detail-meta">
            <p><strong>Categoría:</strong> {producto.categoria}</p>
            <p><strong>Características:</strong> {producto.caracteristicas}</p>
            <p><strong>Descripción:</strong> {producto.descripcion}</p>
          </div>

          <div className="product-detail-pricing">
            <div className="product-detail-price">
              {producto.precio.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </div>
            <div className="product-detail-stock">
              {producto.stock > 0 ? 
                <span className="in-stock">{producto.stock} unidades disponibles</span> : 
                <span className="out-of-stock">Sin stock</span>
              }
            </div>
          </div>

          <button 
            className="add-to-cart-button"
            disabled={producto.stock <= 0}
          >
            {producto.stock > 0 ? 'Añadir al carrito' : 'Sin stock'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductoDetalle; 