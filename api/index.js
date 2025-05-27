import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { path: endpoint } = req.query;

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
    const dbPath = path.join(process.cwd(), 'db.json');
    const file = await fs.readFile(dbPath, 'utf-8');
    const data = JSON.parse(file);

    switch (endpoint) {
      case 'productos':
        return res.status(200).json(data.productos || []);
      case 'usuarios':
        return res.status(200).json(data.usuarios || []);
      case 'comunidad':
        return res.status(200).json(data.comunidad || []);
      default:
        return res.status(404).json({ error: 'Endpoint not found' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 