import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/Productos.css';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 12;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosRes = await fetch('http://localhost:3000/productos');
        const productosData = await productosRes.json();
        
        // Extraer categorías únicas de los productos
        const categoriasUnicas = [...new Set(productosData.map(producto => producto.categoria))];
        const categoriasData = categoriasUnicas.map((categoria, index) => ({
          id: index + 1,
          nombre: categoria
        }));
        
        setProductos(productosData);
        setCategorias(categoriasData);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const productosFiltrados = productos.filter(producto => {
    const coincideCategoria = categoriaSeleccionada === '' || producto.categoria === categoriaSeleccionada;
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const productosPaginados = productosFiltrados.slice(
    (paginaActual - 1) * productosPorPagina,
    paginaActual * productosPorPagina
  );

  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return <div className="loading">Cargando productos...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="productos-container">
      <div className="filtros">
        <select
          value={categoriaSeleccionada}
          onChange={(e) => {
            setCategoriaSeleccionada(e.target.value);
            setPaginaActual(1);
          }}
        >
          <option value="">Todas las categorías</option>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.nombre}>
              {categoria.nombre}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPaginaActual(1);
          }}
        />
      </div>

      <div className="productos-grid">
        {productosPaginados.map(producto => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>

      <div className="paginacion">
        <button
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
        >
          Anterior
        </button>
        
        <span>
          Página {paginaActual} de {totalPaginas}
        </span>
        
        <button
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Productos;
