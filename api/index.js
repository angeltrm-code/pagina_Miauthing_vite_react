import { promises as fs } from 'fs';
import path from 'path';

// Handler principal para todas las rutas de la API bajo /api
export default async function handler(req, res) {
  // Extrae el segmento de la ruta de la URL (ej: "productos", "usuarios")
  const { path: endpoint } = req.query;

  // Configura los headers CORS (Cross-Origin Resource Sharing) para permitir solicitudes desde cualquier origen
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Permite los métodos HTTP GET y OPTIONS
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  // Permite el header Content-Type
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Maneja las solicitudes OPTIONS (preflight requests) y responde con 200 OK
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Si el método HTTP no es GET, responde con 405 Method Not Allowed
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Construye la ruta absoluta al archivo db.json, asumiendo que está en la raíz del proyecto
    const dbPath = path.join(process.cwd(), 'db.json');
    // Lee el contenido del archivo db.json de forma asíncrona
    const file = await fs.readFile(dbPath, 'utf-8');
    // Parsea el contenido JSON a un objeto JavaScript
    const data = JSON.parse(file);

    // Usa un switch para manejar diferentes endpoints basados en el segmento de la ruta
    switch (endpoint) {
      // Si el endpoint es /api/productos
      case 'productos':
        // Responde con el array de productos o un array vacío si no existe
        return res.status(200).json(data.productos || []);
      // Si el endpoint es /api/usuarios
      case 'usuarios':
        // Responde con el array de usuarios o un array vacío si no existe
        return res.status(200).json(data.usuarios || []);
      // Si el endpoint es /api/comunidad
      case 'comunidad':
        // Responde con el array de comunidad o un array vacío si no existe
        return res.status(200).json(data.comunidad || []);
      // Si el endpoint no coincide con ninguno de los casos anteriores
      default:
        // Responde con 404 Not Found
        return res.status(404).json({ error: 'Endpoint not found' });
    }
  } catch (error) {
    // Si ocurre algún error durante la lectura o parsing del archivo
    console.error('API Error:', error); // Log del error en la consola del servidor
    // Responde con 500 Internal Server Error
    return res.status(500).json({ error: 'Internal server error' });
  }
} 