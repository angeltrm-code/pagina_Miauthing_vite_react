import { readFileSync, writeFileSync } from 'fs';

const imageMap = {
  'Cajas PC': 'https://images.unsplash.com/photo-1587202372161-587e5d7fd3cf?q=80&w=2574&auto=format&fit=crop',
  'Placas Base': 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2670&auto=format&fit=crop',
  'Ratones Gaming': 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=2730&auto=format&fit=crop',
  'Procesadores': 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2574&auto=format&fit=crop',
  'Memorias RAM': 'https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=2669&auto=format&fit=crop',
  'Tarjetas Gráficas': 'https://images.unsplash.com/photo-1587202372616-b43abea06c2f?q=80&w=2574&auto=format&fit=crop',
  'Monitores Gaming': 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?q=80&w=2574&auto=format&fit=crop',
  'Monitores': 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?q=80&w=2574&auto=format&fit=crop',
  'Teclados Gaming': 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=2574&auto=format&fit=crop',
  'Refrigeración': 'https://images.unsplash.com/photo-1587202372299-dd2f8e6f0917?q=80&w=2574&auto=format&fit=crop',
  'Ventiladores': 'https://images.unsplash.com/photo-1587202372824-85da760e6d13?q=80&w=2574&auto=format&fit=crop',
  'Auriculares': 'https://images.unsplash.com/photo-1618066296858-06ee5f8bef3f?q=80&w=2574&auto=format&fit=crop',
  'Auriculares Gaming': 'https://images.unsplash.com/photo-1618066296858-06ee5f8bef3f?q=80&w=2574&auto=format&fit=crop',
  'Webcams': 'https://images.unsplash.com/photo-1596382940920-9f8e2011f07c?q=80&w=2574&auto=format&fit=crop',
  'Impresoras': 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=2670&auto=format&fit=crop',
  'Almacenamiento': 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=2574&auto=format&fit=crop',
  'Tarjetas de Sonido': 'https://images.unsplash.com/photo-1558098329-44e8e4d34785?q=80&w=2574&auto=format&fit=crop',
  'Micrófonos': 'https://images.unsplash.com/photo-1583593711082-aaa381feb2f3?q=80&w=2574&auto=format&fit=crop',
  'Fuentes de Alimentación': 'https://images.unsplash.com/photo-1587202372412-1c0abe6b0cdd?q=80&w=2574&auto=format&fit=crop',
  'Discos Duros': 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?q=80&w=2574&auto=format&fit=crop',
  'SSD': 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=2574&auto=format&fit=crop',
  'Sillas Gaming': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2574&auto=format&fit=crop',
  'Altavoces': 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=2670&auto=format&fit=crop',
  'Accesorios': 'https://images.unsplash.com/photo-1583593711082-aaa381feb2f3?q=80&w=2574&auto=format&fit=crop'
};

try {
  const json = JSON.parse(readFileSync('db.json', 'utf8'));

  json.productos.forEach(producto => {
    if (imageMap[producto.categoria]) {
      producto.imagen = imageMap[producto.categoria];
    } else {
      console.log(`Categoría sin imagen asignada: ${producto.categoria}`);
    }
  });

  writeFileSync('db.json', JSON.stringify(json, null, 2));
  console.log('Imágenes actualizadas correctamente');
} catch (error) {
  console.error('Error al actualizar las imágenes:', error);
} 