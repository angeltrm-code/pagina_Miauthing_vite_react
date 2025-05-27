const config = {
  development: {
    apiUrl: 'http://localhost:3000/api'
  },
  production: {
    apiUrl: '/api'
  }
};

const env = import.meta.env.MODE || 'development';
export const apiUrl = config[env].apiUrl;

// Headers simplificados para desarrollo
export const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}; 