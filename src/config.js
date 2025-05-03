const config = {
  development: {
    apiUrl: 'http://localhost:3000'
  },
  production: {
    apiUrl: 'https://api.jsonbin.io/v3/b/6815dd878a456b796696b07e'
  }
};

const env = import.meta.env.MODE || 'development';
export const apiUrl = config[env].apiUrl;

// Configuración para JSONBin.io
export const headers = {
  'Content-Type': 'application/json',
  'X-Master-Key': '$2a$10$.6I/gNgMmkODXkJE6q7/4OgfPVd6fAdEWO97B673cQH4DqlN6eNcW'
}; 