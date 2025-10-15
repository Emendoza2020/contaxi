const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const SECRET = 'clave_jwt_segura';

exports.register = (req, res) => {
    const { nombre, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).send(err);

        User.create({ nombre, email, password: hash, rol_id: 2 }, (err) => {
            if (err) return res.status(500).send(err);
            res.json({ message: 'Usuario registrado con éxito' });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    User.getByEmail(email, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

            const token = jwt.sign({ id: user.id, rol_id: user.rol_id }, SECRET, { expiresIn: '1h' });
            res.json({ token });
        });
    });
};