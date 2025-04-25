import React, { useState } from 'react';
import '../styles/ProductCard.css';
import ProductDetail from './ProductDetail';
import { useCart } from '../context/CartContext';

// Imágenes de fallback por categoría
const categoryFallbacks = {
  "Cajas PC": "https://images.pexels.com/photos/2225617/pexels-photo-2225617.jpeg",
  "Placas Base": "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
  "Ratones Gaming": "https://images.pexels.com/photos/5499303/pexels-photo-5499303.jpeg",
  "Procesadores": "https://images.pexels.com/photos/2588757/pexels-photo-2588757.jpeg",
  "Memorias RAM": "https://images.pexels.com/photos/2588757/pexels-photo-2588757.jpeg",
  "Tarjetas Gráficas": "https://images.pexels.com/photos/5474286/pexels-photo-5474286.jpeg",
  "Monitores Gaming": "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg",
  "Teclados Gaming": "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg",
  "Refrigeración": "https://images.pexels.com/photos/6913135/pexels-photo-6913135.jpeg",
  "Almacenamiento": "https://images.pexels.com/photos/5474731/pexels-photo-5474731.jpeg",
  "Ventiladores": "https://images.pexels.com/photos/6913136/pexels-photo-6913136.jpeg",
  "Auriculares Gaming": "https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg",
  "Micrófonos": "https://images.pexels.com/photos/13929608/pexels-photo-13929608.jpeg",
  "Webcams": "https://images.pexels.com/photos/3201477/pexels-photo-3201477.jpeg",
  "Impresoras": "https://images.pexels.com/photos/4792733/pexels-photo-4792733.jpeg",
  "Sillas Gaming": "https://images.pexels.com/photos/7679865/pexels-photo-7679865.jpeg",
  "Fuentes de Alimentación": "https://images.pexels.com/photos/5474297/pexels-photo-5474297.jpeg",
  "SSD": "https://images.pexels.com/photos/5474731/pexels-photo-5474731.jpeg",
  "Discos Duros": "https://images.pexels.com/photos/5474731/pexels-photo-5474731.jpeg",
  "Tarjetas de Sonido": "https://images.pexels.com/photos/2588757/pexels-photo-2588757.jpeg",
  "Altavoces": "https://images.pexels.com/photos/2651794/pexels-photo-2651794.jpeg"
};

const defaultImage = '/images/products/default-image.svg';

function ProductCard({ producto }) {
  const [imageError, setImageError] = useState(false);
  const [categoryFallbackError, setCategoryFallbackError] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { addToCart } = useCart();

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
    } else if (!categoryFallbackError) {
      setCategoryFallbackError(true);
    }
  };

  const getImageSource = () => {
    if (!imageError) {
      return producto.imagen;
    } else if (!categoryFallbackError && categoryFallbacks[producto.categoria]) {
      return categoryFallbacks[producto.categoria];
    }
    return defaultImage;
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
            src={getImageSource()}
            alt={producto.nombre}
            onError={handleImageError}
            className={categoryFallbackError ? 'default-image' : ''}
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
        <div className="product-buttons">
          <button 
            className="view-details-btn"
            onClick={() => setShowDetails(true)}
          >
            Ver más
          </button>
          <button 
            className="add-to-cart-btn"
            onClick={() => addToCart(producto)}
            disabled={producto.stock <= 0}
          >
            {producto.stock > 0 ? 'Añadir al carrito' : 'Sin stock'}
          </button>
        </div>
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