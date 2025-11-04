import jwt from 'jsonwebtoken';
import Usuario from '../models/usuarioModel.js';
import Rol from '../models/rolModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_secreta';

export const verifyToken = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'No token proporcionado' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        req.userEmail = decoded.email;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido' });
    }
};

export const checkRole = (roles) => async(req, res, next) => {
    try {
        const usuario = await Usuario.findByPk(req.userId);
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

        const rol = await Rol.findByPk(usuario.id_rol);
        if (!rol) return res.status(404).json({ message: 'Rol no encontrado' });

        if (!roles.includes(rol.nombre)) return res.status(403).json({ message: 'Sin permisos' });

        next();
    } catch (err) {
        return res.status(500).json({ message: 'Error verificando rol' });
    }
};