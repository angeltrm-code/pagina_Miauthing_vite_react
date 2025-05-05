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

// Headers simplificados para desarrollo
export const headers = {
  'Content-Type': 'application/json'
}; 