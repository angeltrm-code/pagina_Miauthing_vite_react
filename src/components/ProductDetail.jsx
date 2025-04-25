import React, { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/ProductDetail.css';

const ProductDetail = ({ product: producto, onClose }) => {
  const modalRef = useRef(null);
  const { addToCart } = useCart();

  useEffect(() => {
    // Hacer scroll al modal cuando se abre
    if (modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  if (!producto) {
    return null;
  }

  const handleAddToCart = () => {
    addToCart(producto);
    onClose();
  };

  return (
    <div className="product-detail-overlay" onClick={onClose}>
      <div 
        className="product-detail-modal" 
        ref={modalRef}
        onClick={e => e.stopPropagation()}
      >
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
            <div className="product-detail-header">
              <h2>{producto.nombre}</h2>
              <div className="product-brand">
                <span className="brand-label">Marca:</span> {producto.marca}
              </div>
            </div>

            <div className="product-detail-pricing">
              <div className="product-price">
                <span className="price-amount">{producto.precio}€</span>
              </div>
              
              <div className="product-stock">
                <span className="stock-label">Stock disponible:</span>
                <span className={`stock-amount ${producto.stock <= 5 ? 'low-stock' : ''}`}>
                  {producto.stock} unidades
                </span>
              </div>
            </div>
            
            {producto.caracteristicas && (
              <div className="product-characteristics">
                <h3>Características principales:</h3>
                <ul>
                  {producto.caracteristicas.split('. ').map((caracteristica, index) => (
                    caracteristica && <li key={index}>{caracteristica}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {producto.descripcion && (
              <div className="product-description">
                <h3>Descripción:</h3>
                <p>{producto.descripcion}</p>
              </div>
            )}
            
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={producto.stock <= 0}
            >
              {producto.stock > 0 ? 'Añadir al carrito' : 'Sin stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 