# MiauThing Tech - Panel de Administración

Panel de administración para la tienda de componentes informáticos MiauThing Tech, desarrollado con React y Vite.

## 🚀 Características

- Dashboard interactivo con estadísticas en tiempo real
- Visualización de productos y stock
- Gráficos de rendimiento y análisis
- Diseño responsive y moderno
- API integrada para gestión de datos

## 🛠️ Tecnologías

- React 18
- Vite
- Recharts (visualización de datos)
- CSS Modules
- API REST

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/miauthingtech.git
cd miauthingtech
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## 🏗️ Construcción

Para crear una versión de producción:

```bash
npm run build
```

## 🌐 Despliegue

El proyecto está configurado para ser desplegado en Vercel. La configuración incluye:

- Rutas de API optimizadas
- Manejo de CORS
- Configuración de entorno de producción
- Optimización de assets

## 📝 Estructura del Proyecto

```
miauthingtech/
├── api/              # Endpoints de la API
├── src/
│   ├── components/   # Componentes React
│   ├── pages/        # Páginas de la aplicación
│   ├── styles/       # Estilos CSS
│   └── config.js     # Configuración de la aplicación
├── public/           # Archivos estáticos
└── vercel.json       # Configuración de Vercel
```

## 🔧 Configuración

El proyecto utiliza diferentes configuraciones para desarrollo y producción:

- Desarrollo: `http://localhost:3000`
- Producción: Rutas relativas para API

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Contribución

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
