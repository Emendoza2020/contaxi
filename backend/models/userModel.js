const db = require('../config/db');

const User = {
    getAll: callback => {
        db.query('SELECT u.id, u.nombre, u.email, r.nombre AS rol FROM usuarios u LEFT JOIN roles r ON u.rol_id = r.id', callback);
    },
    getByEmail: (email, callback) => {
        db.query('SELECT * FROM usuarios WHERE email = ?', [email], callback);
    },
    create: (data, callback) => {
        db.query('INSERT INTO usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)', [data.nombre, data.email, data.password, data.rol_id], callback);
    }
};

module.exports = User;