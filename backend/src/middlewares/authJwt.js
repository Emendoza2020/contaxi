import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET || 'super_secret_key';

export const verificarToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token n o proporcionado' });

    try {
        const decoded = jwt.verify(token, secretKey);
        req.usuario = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

export const verificarRol = (...rolesPermitidos) => {
    return (req, res, next) => {
        const rol = req.usuario ?.rol;
        if (!rolesPermitidos.includes(rol)) {
            return res.status(403).json({ message: 'Acceso denegado' });
        }
        next();
    };
};