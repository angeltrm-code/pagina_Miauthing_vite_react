import React, { useEffect, useState, useMemo } from "react";
import "../styles/Dashboard.css";
import { apiUrl, headers } from "../config";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const usuario = {
  nombre: "Angel",
  avatar: "https://ui-avatars.com/api/?name=Angel&background=ff0000&color=fff&size=128",
  nivel: "Premium",
  puntos: 1250,
  fechaRegistro: "2024-01-15"
};

// Simulación de pedidos (puedes conectar a tu db si tienes pedidos reales)
const pedidosSimulados = [
  { id: 1, fecha: "2024-06-01", estado: "Entregado", total: 199.99, productos: [1, 3] },
  { id: 2, fecha: "2024-06-10", estado: "En camino", total: 89.99, productos: [5] },
  { id: 3, fecha: "2024-06-15", estado: "Pendiente", total: 49.99, productos: [2] },
];

// Simulación de historial de compras para la gráfica
const historialCompras = [
  { mes: "Ene", total: 150 },
  { mes: "Feb", total: 230 },
  { mes: "Mar", total: 180 },
  { mes: "Abr", total: 290 },
  { mes: "May", total: 320 },
  { mes: "Jun", total: 340 },
];

const DashboardCliente = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarDetallesPedido, setMostrarDetallesPedido] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/productos`, {
          method: "GET",
          headers: headers,
        });
        if (!response.ok) throw new Error("Error al cargar productos");
        const data = await response.json();
        setProductos(data);
      } catch (err) {
        setError("No se pudo cargar los productos. ¿Está corriendo el servidor?");
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  // Total gastado
  const totalGastado = useMemo(() => pedidosSimulados.reduce((acc, p) => acc + p.total, 0), []);

  // Últimos pedidos
  const ultimosPedidos = pedidosSimulados.slice(0, 3);

  // Recomendaciones: productos más vendidos (simulado: los de mayor stock)
  const recomendaciones = useMemo(() =>
    [...productos].sort((a, b) => b.stock - a.stock).slice(0, 4), [productos]);

  // Notificaciones simuladas
  const notificaciones = [
    "¡Tu pedido #2 está en camino!",
    "Nuevo producto en oferta: " + (productos[0]?.nombre || "..."),
    "Recuerda completar tu perfil para recibir recomendaciones personalizadas.",
    "¡Has ganado 50 puntos por tu última compra!",
    "Tu nivel Premium se renueva en 15 días"
  ];

  // Calcular próximos beneficios
  const proximosBeneficios = [
    { nivel: "1500 puntos", beneficio: "Envío gratis en tu próxima compra" },
    { nivel: "2000 puntos", beneficio: "10% de descuento en tu próxima compra" },
    { nivel: "3000 puntos", beneficio: "Acceso a productos exclusivos" }
  ];

  if (loading) return <div className="loading">Cargando tu área de cliente...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header" style={{display:'flex', alignItems:'center', gap:'2rem'}}>
        <img src={usuario.avatar} alt="avatar" style={{borderRadius:'50%', width:80, height:80, border:'3px solid #ff0000'}} />
        <div>
          <h1 style={{color:'#ff0000'}}>¡Hola, {usuario.nombre}!</h1>
          <p style={{color:'#ff0000', fontWeight:600}}>Bienvenido a tu área personal</p>
          <div style={{display:'flex', gap:'1rem', marginTop:'0.5rem'}}>
            <span style={{background:'#ff0000', color:'white', padding:'0.3rem 0.8rem', borderRadius:'20px', fontSize:'0.9rem'}}>
              {usuario.nivel}
            </span>
            <span style={{background:'#222', color:'#ffd700', padding:'0.3rem 0.8rem', borderRadius:'20px', fontSize:'0.9rem'}}>
              {usuario.puntos} puntos
            </span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Resumen rápido */}
        <div className="dashboard-card" style={{minWidth:320}}>
          <h3>Resumen de pedidos</h3>
          <ul className="activity-list">
            {ultimosPedidos.map(p => (
              <li key={p.id} style={{cursor:'pointer'}} onClick={() => setMostrarDetallesPedido(p.id)}>
                <b>#{p.id}</b> - {p.estado} - {p.fecha} - <span style={{color:'#ffd700'}}>{p.total.toLocaleString('es-ES', {style:'currency', currency:'EUR'})}</span>
              </li>
            ))}
          </ul>
          <div style={{marginTop:'1rem', fontWeight:'bold', color:'#00ff99', fontSize:'1.2rem'}}>
            Total gastado: {totalGastado.toLocaleString('es-ES', {style:'currency', currency:'EUR'})}
          </div>
        </div>

        {/* Gráfica de compras */}
        <div className="dashboard-card">
          <h3>Historial de Compras</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historialCompras}>
              <XAxis dataKey="mes" stroke="#ff0000" />
              <YAxis stroke="#ff0000" />
              <Tooltip contentStyle={{ background: '#222', color: '#ff0000', border: '1px solid #ff0000' }} />
              <Line type="monotone" dataKey="total" stroke="#ff0000" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Accesos rápidos */}
        <div className="dashboard-card" style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minWidth:320}}>
          <h3>Accesos rápidos</h3>
          <div style={{display:'flex', gap:'1.2rem', flexWrap:'wrap'}}>
            <button className="quick-action">Editar perfil</button>
            <button className="quick-action">Historial de pedidos</button>
            <button className="quick-action">Soporte</button>
            <button className="quick-action">Productos recomendados</button>
            <button className="quick-action">Mis favoritos</button>
            <button className="quick-action">Direcciones guardadas</button>
          </div>
        </div>

        {/* Recomendaciones */}
        <div className="dashboard-card" style={{minWidth:320}}>
          <h3>Recomendaciones para ti</h3>
          <div style={{display:'flex', gap:'1.2rem', flexWrap:'wrap'}}>
            {recomendaciones.map(p => (
              <div key={p.id} style={{background:'#222', borderRadius:10, padding:10, minWidth:120, color:'#fff', border:'1.5px solid #ff0000', textAlign:'center'}}>
                <img src={p.imagen} alt={p.nombre} style={{width:80, height:80, objectFit:'cover', borderRadius:8, marginBottom:8}} />
                <div style={{fontWeight:'bold', color:'#ff0000'}}>{p.nombre}</div>
                <div style={{fontSize:'0.95rem', color:'#ffd700'}}>{p.precio}€</div>
              </div>
            ))}
          </div>
        </div>

        {/* Programa de fidelidad */}
        <div className="dashboard-card">
          <h3>Programa de Fidelidad</h3>
          <div style={{marginBottom:'1rem'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'0.5rem'}}>
              <span>Nivel actual: {usuario.nivel}</span>
              <span>{usuario.puntos} / 3000 puntos</span>
            </div>
            <div style={{width:'100%', height:'10px', background:'#222', borderRadius:'5px', overflow:'hidden'}}>
              <div style={{width:`${(usuario.puntos/3000)*100}%`, height:'100%', background:'#ff0000'}}></div>
            </div>
          </div>
          <h4 style={{color:'#ffd700', marginBottom:'0.5rem'}}>Próximos beneficios:</h4>
          <ul style={{listStyle:'none', padding:0}}>
            {proximosBeneficios.map((b, i) => (
              <li key={i} style={{marginBottom:'0.5rem', display:'flex', justifyContent:'space-between'}}>
                <span>{b.nivel}</span>
                <span style={{color:'#00ff99'}}>{b.beneficio}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Notificaciones */}
        <div className="dashboard-card notifications-card">
          <h3 style={{fontSize:'1.1rem', marginBottom:'0.7rem'}}>Notificaciones</h3>
          <ul className="activity-list" style={{fontSize:'0.95rem'}}>
            {notificaciones.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal de detalles del pedido */}
      {mostrarDetallesPedido && (
        <div className="modal-overlay" onClick={() => setMostrarDetallesPedido(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Detalles del Pedido #{mostrarDetallesPedido}</h3>
            <div style={{marginTop:'1rem'}}>
              <p><strong>Estado:</strong> {pedidosSimulados.find(p => p.id === mostrarDetallesPedido)?.estado}</p>
              <p><strong>Fecha:</strong> {pedidosSimulados.find(p => p.id === mostrarDetallesPedido)?.fecha}</p>
              <p><strong>Total:</strong> {pedidosSimulados.find(p => p.id === mostrarDetallesPedido)?.total.toLocaleString('es-ES', {style:'currency', currency:'EUR'})}</p>
            </div>
            <button className="close-btn" onClick={() => setMostrarDetallesPedido(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCliente; 