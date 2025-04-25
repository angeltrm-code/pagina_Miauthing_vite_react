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
        const [productosRes, categoriasRes] = await Promise.all([
          fetch('http://localhost:3000/productos'),
          fetch('http://localhost:3000/categorias')
        ]);
        
        const productosData = await productosRes.json();
        const categoriasData = await categoriasRes.json();
        
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

  const handlePageChange = (event) => {
    const newPage = parseInt(event.target.value);
    setPaginaActual(newPage);
  };

  if (loading) {
    return <div className="loading">Cargando productos...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <main className="main-productos">
      <div className="productos-container">
        <h1>Nuestros Productos</h1>
        <div className="filtros">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="busqueda-input"
          />
          
          <select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            className="categoria-select"
          >
            <option value="">Todas las categorías</option>
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.nombre}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="productos-grid">
          {productosPaginados.map(producto => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>

        {totalPaginas > 1 && (
          <div className="paginacion">
            <button
              onClick={() => setPaginaActual(p => Math.max(1, p - 1))}
              disabled={paginaActual === 1}
            >
              Anterior
            </button>
            
            <div className="paginacion-info">
              <div className="pagina-selector">
                <label htmlFor="pagina-select">Ir a página:</label>
                <select
                  id="pagina-select"
                  value={paginaActual}
                  onChange={handlePageChange}
                >
                  {[...Array(totalPaginas)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <span>de {totalPaginas}</span>
            </div>

            <button
              onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))}
              disabled={paginaActual === totalPaginas}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Productos;
