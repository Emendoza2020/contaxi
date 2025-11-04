import bcrypt from 'bcryptjs';
import db from '../models/index.js';
import Usuario from '../models/usuarioModel.js';
import Persona from '../models/personaModel.js';
import Conductor from '../models/conductorModel.js';

export const registrarConductor = async(req, res) => {
    try {
        const { nombres, apellidos, ci, telefono, direccion, email, password } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        const persona = await Persona.create({ nombres, apellidos, ci, telefono, direccion });
        const usuario = await Usuario.create({
            email,
            password: hashed,
            id_persona: persona.id,
            id_rol: id_rol || 3 // por defecto 'user'
        });

        res.json({ message: 'Usuario registrado exitosamente', usuario });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error en el registro', error: err.message });
    }
};