const jwt = require('jsonwebtoken');
const { Usuario, Rol, Persona } = require('../models');
const dotenv = require('dotenv');
dotenv.config();

exports.verifyToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Usuario.findByPk(decoded.id, { include: [Rol, Persona] });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.Rol.nombre === 'admin') next();
  else res.status(403).json({ message: 'Requiere rol administrador' });
};
