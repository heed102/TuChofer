const express = require('express');
const router = express.Router();
const auth = require('./routes/auth');

// Simulación de base de datos en memoria
const users = [];

router.post('/register', (req, res) => {
  const { name, email, role } = req.body; // role puede ser 'pasajero' o 'chofer'
  const newUser = { id: Date.now(), name, email, role };
  users.push(newUser);
  res.status(201).json({ message: 'Usuario registrado', user: newUser });
});

router.post('/login', (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json({ message: 'Inicio de sesión exitoso', user });
});

module.exports = router;