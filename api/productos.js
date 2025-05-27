import productos from '../db.json' assert { type: 'json' };

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(productos.productos);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
} 