import productos from '../db.json' assert { type: 'json' };

export default function handler(req, res) {
  const { path } = req.query;

  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo permitir GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    switch (path) {
      case 'productos':
        return res.status(200).json(productos.productos);
      case 'usuarios':
        return res.status(200).json(productos.usuarios);
      case 'comunidad':
        return res.status(200).json(productos.comunidad);
      default:
        return res.status(404).json({ error: 'Endpoint not found' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 