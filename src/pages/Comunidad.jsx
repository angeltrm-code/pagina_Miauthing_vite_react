import { useState, useEffect } from 'react';
import '../styles/Comunidad.css';
import { apiUrl, headers } from '../config';

const Comunidad = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/usuarios`, {
          method: 'GET',
          headers: headers
        });

        if (!response.ok) {
          throw new Error(`Error del servidor: ${response.status}`);
        }

        const data = await response.json();
        setUsuarios(data);
      } catch (err) {
        console.error('Error al cargar usuarios:', err);
        setError('No se pudo cargar los datos de la comunidad. Por favor, intente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  if (loading) {
    return <div className="loading">Cargando comunidad...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main className="main-comunidad">
      <div className="comunidad-container">
        <h1>Nuestra Comunidad</h1>
        <p className="comunidad-descripcion">
          Únete a nuestra comunidad de entusiastas de la tecnología y comparte tus experiencias
        </p>
        
        <div className="usuarios-grid">
          {usuarios.map(usuario => (
            <div key={usuario.id} className="usuario-card">
              <img src={usuario.avatar} alt={usuario.nombre} className="usuario-avatar" />
              <div className="usuario-info">
                <h3>{usuario.nombre}</h3>
                <p className="usuario-fecha">Miembro desde: {new Date(usuario.fecha_registro).toLocaleDateString()}</p>
                <p className="usuario-mensaje">{usuario.mensaje}</p>
                <a href={`mailto:${usuario.correo}`} className="usuario-contacto">
                  Contactar
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Comunidad;
