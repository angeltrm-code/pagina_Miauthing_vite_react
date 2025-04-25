import React from 'react';
import '../styles/ProductDetail.css';

const ProductDetail = ({ product: producto, onClose }) => {
  if (!producto) {
    return null;
  }

  return (
    <div className="product-detail-overlay">
      <div className="product-detail-modal">
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="product-detail-content">
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
            <h2>{producto.nombre}</h2>
            <div className="product-brand">
              <span className="brand-label">Marca:</span> {producto.marca}
            </div>
            
            <div className="product-price">
              <span className="price-label">Precio:</span>
              <span className="price-amount">{producto.precio}€</span>
            </div>
            
            <div className="product-stock">
              <span className="stock-label">Stock disponible:</span> {producto.stock} unidades
            </div>
            
            <div className="product-characteristics">
              <h3>Características:</h3>
              <p>{producto.caracteristicas}</p>
            </div>
            
            <div className="product-description">
              <h3>Descripción:</h3>
              <p>{producto.descripcion}</p>
            </div>
            
            <button className="add-to-cart-btn">
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 