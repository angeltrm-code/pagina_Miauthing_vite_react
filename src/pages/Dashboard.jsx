import React, { useEffect, useState, useMemo } from "react";
import "../styles/Dashboard.css";
import { apiUrl, headers } from "../config";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ["#ff0000", "#ff7300", "#ffd700", "#00c49f", "#0088fe", "#a020f0", "#ff69b4", "#00bfff", "#ff6347", "#32cd32"];

const Dashboard = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${apiUrl}/productos`, {
          method: "GET",
          headers: headers,
        });
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Formato de datos inválido');
        }
        
        setProductos(data);
      } catch (err) {
        console.error("Error fetching productos:", err);
        setError("No se pudieron cargar los productos. Por favor, intente más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  // Cálculos
  const totalProductos = productos.length;
  const topStock = useMemo(() =>
    [...productos].sort((a, b) => b.stock - a.stock).slice(0, 3), [productos]);
  const ultimosProductos = useMemo(() =>
    [...productos].sort((a, b) => b.id - a.id).slice(0, 3), [productos]);
  const resumenCategorias = useMemo(() => {
    const resumen = {};
    productos.forEach(p => {
      resumen[p.categoria] = (resumen[p.categoria] || 0) + 1;
    });
    return resumen;
  }, [productos]);
  const resumenMarcasStock = useMemo(() => {
    const resumen = {};
    productos.forEach(p => {
      resumen[p.marca] = (resumen[p.marca] || 0) + p.stock;
    });
    return resumen;
  }, [productos]);
  const productosCaros = useMemo(() =>
    [...productos].sort((a, b) => b.precio - a.precio).slice(0, 3), [productos]);
  const productosBaratos = useMemo(() =>
    [...productos].sort((a, b) => a.precio - b.precio).slice(0, 3), [productos]);
  const productosSinStock = useMemo(() =>
    productos.filter(p => p.stock === 0), [productos]);

  // Notificaciones simuladas
  const notificaciones = [
    "Nuevo producto añadido: " + (ultimosProductos[0]?.nombre || "...") ,
    `Hay ${topStock[0]?.stock || 0} unidades de ${topStock[0]?.nombre || "..."} en stock`,
    `Total de categorías: ${Object.keys(resumenCategorias).length}`
  ];

  // Limitar a las 8 categorías principales y agrupar el resto como 'Otros'
  function agruparTopCategorias(data, keyLabel = 'categoria', keyValue = 'cantidad', topN = 8) {
    if (data.length <= topN) return data;
    const top = data.slice(0, topN);
    const otros = data.slice(topN).reduce((acc, curr) => acc + curr[keyValue], 0);
    return [...top, { [keyLabel]: 'Otros', [keyValue]: otros }];
  }

  // Para productos por categoría (barra)
  const dataCategoriasRaw = Object.entries(resumenCategorias).map(([cat, count]) => ({ categoria: cat, cantidad: count }));
  const dataCategorias = agruparTopCategorias(
    [...dataCategoriasRaw].sort((a, b) => b.cantidad - a.cantidad),
    'categoria', 'cantidad', 8
  );

  // Para stock por categoría (tarta)
  const resumenStockPorCategoria = useMemo(() => {
    const resumen = {};
    productos.forEach(p => {
      resumen[p.categoria] = (resumen[p.categoria] || 0) + p.stock;
    });
    return resumen;
  }, [productos]);
  const dataStockPorCategoriaRaw = Object.entries(resumenStockPorCategoria).map(([cat, stock]) => ({ name: cat, value: stock }));
  const dataStockPorCategoria = agruparTopCategorias(
    [...dataStockPorCategoriaRaw].sort((a, b) => b.value - a.value),
    'name', 'value', 8
  );

  // Datos inventados para balance económico
  const balance = {
    ingresos: 15432.50,
    gastos: 10250.75,
    beneficio: 5181.75,
    rentabilidad: 33.2 // porcentaje
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando datos del dashboard...</p>
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

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Bienvenido, <br /> <span style={{color:'#ff0000'}}>Admin</span></h1>
      </div>
      <div className="dashboard-content">
        {/* Panel de acciones rápidas */}
        <div className="dashboard-card" style={{gridColumn: '1 / -1', display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center'}}>
          <button className="quick-action">Añadir producto</button>
          <button className="quick-action">Ver usuarios</button>
          <button className="quick-action">Ver pedidos</button>
          <button className="quick-action">Soporte</button>
        </div>
        {/* Balance económico */}
        <div className="dashboard-card economic-balance">
          <h3>Balance Económico</h3>
          <div className="balance-grid">
            <div className="balance-item">
              <div className="balance-label">Ingresos</div>
              <div className="balance-value" style={{color:'#00ff99'}}>{balance.ingresos.toLocaleString('es-ES', {style:'currency', currency:'EUR'})}</div>
            </div>
            <div className="balance-item">
              <div className="balance-label">Gastos</div>
              <div className="balance-value" style={{color:'#ff7300'}}>{balance.gastos.toLocaleString('es-ES', {style:'currency', currency:'EUR'})}</div>
            </div>
            <div className="balance-item">
              <div className="balance-label">Beneficio</div>
              <div className="balance-value" style={{color:'#ffd700'}}>{balance.beneficio.toLocaleString('es-ES', {style:'currency', currency:'EUR'})}</div>
            </div>
            <div className="balance-item">
              <div className="balance-label">Rentabilidad</div>
              <div className="balance-value" style={{color:'#ff0000'}}>{balance.rentabilidad}%</div>
            </div>
          </div>
        </div>
        {/* Gráfica de barras: productos por categoría */}
        <div className="dashboard-card">
          <h3>Productos por Categoría</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={dataCategorias} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
              <XAxis dataKey="categoria" stroke="#ff0000" tick={{ fill: '#ff0000', fontWeight: 600, fontSize: 13, angle: -30, dy: 20 }} interval={0} />
              <YAxis stroke="#ff0000" tick={{ fill: '#ff0000', fontWeight: 600 }} allowDecimals={false} />
              <Tooltip contentStyle={{ background: '#222', color: '#ff0000', border: '1px solid #ff0000', fontSize: 16 }} labelStyle={{ color: '#ff0000' }} itemStyle={{ color: '#ff0000' }} />
              <Bar dataKey="cantidad" fill="#ff0000">
                {dataCategorias.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Gráfica de pastel: stock por categoría */}
        <div className="dashboard-card">
          <h3>Stock total por Categoría</h3>
          <ResponsiveContainer width="100%" height={340}>
            <PieChart>
              <Pie data={dataStockPorCategoria} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label={{ fill: '#ff0000', fontWeight: 600, fontSize: 14 }}>
                {dataStockPorCategoria.map((entry, index) => (
                  <Cell key={`cell-pie-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#222', color: '#ff0000', border: '1px solid #ff0000', fontSize: 16 }} labelStyle={{ color: '#ff0000' }} itemStyle={{ color: '#ff0000' }} />
              <Legend wrapperStyle={{ fontSize: 14, color: '#ff0000' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Ranking de productos más caros y baratos */}
        <div className="dashboard-card">
          <h3>Top 3 más caros</h3>
          <ul className="activity-list">
            {productosCaros.map(p => (
              <li key={p.id}><b>{p.nombre}</b> ({p.marca}) - <span style={{color:'#ffd700'}}>{p.precio}€</span></li>
            ))}
          </ul>
        </div>
        <div className="dashboard-card">
          <h3>Top 3 más baratos</h3>
          <ul className="activity-list">
            {productosBaratos.map(p => (
              <li key={p.id}><b>{p.nombre}</b> ({p.marca}) - <span style={{color:'#00ff99'}}>{p.precio}€</span></li>
            ))}
          </ul>
        </div>
        {/* Productos sin stock */}
        <div className="dashboard-card">
          <h3>Productos sin stock</h3>
          {productosSinStock.length === 0 ? (
            <div style={{color:'#0f0', fontWeight:'bold'}}>¡No hay productos agotados!</div>
          ) : (
            <ul className="activity-list">
              {productosSinStock.map(p => (
                <li key={p.id}><b>{p.nombre}</b> ({p.marca})</li>
              ))}
            </ul>
          )}
        </div>
        {/* Resto de tarjetas originales */}
        <div className="dashboard-card">
          <h3>Resumen</h3>
          <div className="stats">
            <div className="stat-item">
              <div className="stat-value">{totalProductos}</div>
              <div className="stat-label">Productos</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{Object.keys(resumenCategorias).length}</div>
              <div className="stat-label">Categorías</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{topStock[0]?.stock || 0}</div>
              <div className="stat-label">Stock máximo</div>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <h3>Top Stock</h3>
          <ul className="activity-list">
            {topStock.map(p => (
              <li key={p.id}><b>{p.nombre}</b> ({p.marca}) - {p.stock} unidades</li>
            ))}
          </ul>
        </div>
        <div className="dashboard-card">
          <h3>Últimos productos</h3>
          <ul className="activity-list">
            {ultimosProductos.map(p => (
              <li key={p.id}><b>{p.nombre}</b> ({p.marca})</li>
            ))}
          </ul>
        </div>
        <div className="dashboard-card">
          <h3>Resumen por categoría</h3>
          <ul className="activity-list">
            {Object.entries(resumenCategorias).map(([cat, count]) => (
              <li key={cat}><b>{cat}</b>: {count} productos</li>
            ))}
          </ul>
        </div>
        {/* Notificaciones pequeñas y en un lateral */}
        <div className="dashboard-card notifications-card">
          <h3 style={{fontSize:'1.1rem', marginBottom:'0.7rem'}}>Notificaciones</h3>
          <ul className="activity-list" style={{fontSize:'0.95rem'}}>
            {notificaciones.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
