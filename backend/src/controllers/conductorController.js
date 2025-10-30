const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario, Persona, Rol } = require('../models');
const dotenv = require('dotenv');
dotenv.config();



exports.registrar = async(req, res) => {
    try {
        const { nombres, apellidos, ci, telefono, direccion, email, password, id_rol } = req.body;

        const hashed = await bcrypt.hash(password, 10);
        const persona = await Persona.create({ nombres, apellidos, ci, telefono, direccion });
        const usuario = await Usuario.create({
            email,
            password: hashed,
            id_persona: persona.id,
            id_rol: id_rol || 2 // por defecto 'user'
        });

        res.json({ message: 'Usuario registrado exitosamente', usuario });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error en el registro', error: err.message });
    }
};