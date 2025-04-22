import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Esto importa el componente App.jsx

// Aquí renderizamos el componente App dentro del contenedor con id "root"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* Aquí es donde tu aplicación se renderiza */}
  </React.StrictMode>
);
