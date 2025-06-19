// Importar dependencias
const express = require('express');
const authRoutes = require('./routes/auth'); // Asegúrate de que esta ruta sea correcta
const cors = require('cors');
require('dotenv').config();

// Inicializar la aplicación
const app = express();

// Middleware y rutas
app.use(cors());
app.use(express.json()); // Middleware para parsear JSON
app.use('/api', authRoutes); // Usar las rutas de autenticación

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API del sistema de viajes!');
});
