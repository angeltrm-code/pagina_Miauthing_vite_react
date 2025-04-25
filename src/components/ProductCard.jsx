import React, { useState } from 'react';
import '../styles/ProductCard.css';
import ProductDetail from './ProductDetail';

function ProductCard({ producto }) {
  const [imageError, setImageError] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const defaultImage = '/images/products/default-image.svg';

  const handleImageError = () => {
    setImageError(true);
  };

  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  if (!producto) {
    return null;
  }

  return (
    <>
      <div className="product-card">
        <div className="product-image-container">
          <img
            src={imageError ? defaultImage : producto.imagen}
            alt={producto.nombre}
            onError={handleImageError}
          />
        </div>
        <div className="product-brand">{producto.marca}</div>
        <h3 className="product-name">{truncateText(producto.nombre, 40)}</h3>
        <p className="product-characteristics">
          {truncateText(producto.caracteristicas, 60)}
        </p>
        <p className="product-description">
          {truncateText(producto.descripcion, 100)}
        </p>
        <div className="product-price">{producto.precio}€</div>
        <div className="product-stock">
          {producto.stock} unidades disponibles
        </div>
        <button 
          className="view-details-btn"
          onClick={() => setShowDetails(true)}
        >
          Ver más
        </button>
      </div>

      {showDetails && (
        <ProductDetail 
          product={producto} 
          onClose={() => setShowDetails(false)} 
        />
      )}
    </>
  );
}

export default ProductCard; 