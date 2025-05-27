// Configuración de la API según el entorno (desarrollo o producción)
const config = {
  // Configuración para el entorno de desarrollo
  development: {
    // URL completa para el servidor local (json-server)
    apiUrl: 'http://localhost:3000/api'
  },
  // Configuración para el entorno de producción (Vercel)
  production: {
    // Ruta relativa para los endpoints de la API en Vercel
    apiUrl: '/api'
  }
};

// Determina el entorno actual (development o production) usando las variables de entorno de Vite
const env = import.meta.env.MODE || 'development';
// Exporta la URL de la API correspondiente al entorno actual
export const apiUrl = config[env].apiUrl;

// Headers por defecto para las solicitudes a la API
export const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json' // Indica que esperamos una respuesta JSON
}; 