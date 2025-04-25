import React from "react";
import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>
          Bienvenido,
          <br />
          Angeltrm-code
        </h1>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>Estadísticas</h3>
          <div className="stats">
            <div className="stat-item">
              <div className="stat-value">12</div>
              <div className="stat-label">Proyectos</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">5</div>
              <div className="stat-label">En Progreso</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">7</div>
              <div className="stat-label">Completados</div>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <h3>Actividad Reciente</h3>
          <ul className="activity-list">
            <li>Nuevo proyecto añadido: "React Dashboard"</li>
            <li>Actualización de perfil completada</li>
            <li>3 nuevos comentarios en proyectos</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
