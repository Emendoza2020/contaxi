const jwt = require('jsonwebtoken');
const SECRET = 'clave_jwt_segura';

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'Token requerido' });

    jwt.verify(token.replace('Bearer ', ''), SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token inválido' });
        req.user = decoded;
        next();
    });
};

exports.isAdmin = (req, res, next) => {
    if (req.user.rol_id === 1) next();
    else res.status(403).json({ message: 'Solo administradores pueden acceder' });
};