import React, { useState, useEffect, useMemo } from 'react';
import '../styles/Productos.css';
import ProductCard from '../components/ProductCard';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 12;
  const [filtros, setFiltros] = useState({
    categoria: '',
    marca: '',
    precioMin: '',
    precioMax: '',
    busqueda: ''
  });

  const productosFiltrados = useMemo(() => {
    return productos.filter(producto => {
      const cumpleCategoria = !filtros.categoria || producto.categoria === filtros.categoria;
      const cumpleMarca = !filtros.marca || producto.marca === filtros.marca;
      const cumplePrecioMin = !filtros.precioMin || producto.precio >= Number(filtros.precioMin);
      const cumplePrecioMax = !filtros.precioMax || producto.precio <= Number(filtros.precioMax);
      const cumpleBusqueda = !filtros.busqueda || 
        producto.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(filtros.busqueda.toLowerCase());

      return cumpleCategoria && cumpleMarca && cumplePrecioMin && cumplePrecioMax && cumpleBusqueda;
    });
  }, [productos, filtros]);

  // Calcular productos para la página actual
  const productosActuales = useMemo(() => {
    const indiceInicio = (paginaActual - 1) * productosPorPagina;
    const indiceFin = indiceInicio + productosPorPagina;
    return productosFiltrados.slice(indiceInicio, indiceFin);
  }, [productosFiltrados, paginaActual]);

  // Calcular número total de páginas
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/productos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`Error del servidor: ${response.status}`);
        }

        const data = await response.json();
        setProductos(data);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError('No se pudo cargar los productos. Por favor, intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  // Reset página actual cuando cambian los filtros
  useEffect(() => {
    setPaginaActual(1);
  }, [filtros]);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaginaChange = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    // Scroll al inicio de los productos
    window.scrollTo({
      top: document.querySelector('.productos-grid').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  if (loading) {
    return <div className="loading">Cargando productos...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="productos-container">
      <div className="filtros">
        <input
          type="text"
          name="busqueda"
          placeholder="Buscar productos..."
          value={filtros.busqueda}
          onChange={handleFiltroChange}
        />
        <select
          name="categoria"
          value={filtros.categoria}
          onChange={handleFiltroChange}
        >
          <option value="">Todas las categorías</option>
          {Array.from(new Set(productos.map(p => p.categoria))).map(categoria => (
            <option key={categoria} value={categoria}>{categoria}</option>
          ))}
        </select>
        <select
          name="marca"
          value={filtros.marca}
          onChange={handleFiltroChange}
        >
          <option value="">Todas las marcas</option>
          {Array.from(new Set(productos.map(p => p.marca))).map(marca => (
            <option key={marca} value={marca}>{marca}</option>
          ))}
        </select>
        <input
          type="number"
          name="precioMin"
          placeholder="Precio mínimo"
          value={filtros.precioMin}
          onChange={handleFiltroChange}
        />
        <input
          type="number"
          name="precioMax"
          placeholder="Precio máximo"
          value={filtros.precioMax}
          onChange={handleFiltroChange}
        />
      </div>

      <div className="productos-grid">
        {productosActuales.map(producto => (
          <div key={producto.id} className="producto-item">
            <ProductCard producto={producto} />
          </div>
        ))}
        {productosFiltrados.length === 0 && (
          <div className="no-productos">
            No se encontraron productos que coincidan con los filtros seleccionados.
          </div>
        )}
      </div>

      {totalPaginas > 1 && (
        <div className="paginacion">
          <button 
            onClick={() => handlePaginaChange(paginaActual - 1)}
            disabled={paginaActual === 1}
          >
            Anterior
          </button>
          
          {[...Array(totalPaginas)].map((_, index) => {
            const numeroPagina = index + 1;
            // Mostrar solo algunas páginas para no sobrecargar la UI
            if (
              numeroPagina === 1 ||
              numeroPagina === totalPaginas ||
              (numeroPagina >= paginaActual - 2 && numeroPagina <= paginaActual + 2)
            ) {
              return (
                <button
                  key={numeroPagina}
                  onClick={() => handlePaginaChange(numeroPagina)}
                  className={paginaActual === numeroPagina ? 'activa' : ''}
                >
                  {numeroPagina}
                </button>
              );
            } else if (
              numeroPagina === paginaActual - 3 ||
              numeroPagina === paginaActual + 3
            ) {
              return <span key={numeroPagina}>...</span>;
            }
            return null;
          })}

          <button 
            onClick={() => handlePaginaChange(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export default React.memo(Productos);
