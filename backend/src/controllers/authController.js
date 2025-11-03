import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Usuario, Rol, Persona } from '../models/index.js';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.JWT_SECRET || 'super_secret_key';

// 🔹 Registro de usuario
export const register = async(req, res) => {
    try {
        const { nombres, apellidos, ci, telefono, direccion, email, password, rol } = req.body;

        // Validar duplicado
        const existe = await Usuario.findOne({ where: { email } });
        if (existe) return res.status(400).json({ message: 'El email ya está registrado' });

        // Crear persona
        const persona = await Persona.create({ nombres, apellidos, ci, telefono, direccion });

        // Buscar rol
        const rolDb = await Rol.findOne({ where: { nombre: rol } });
        if (!rolDb) return res.status(400).json({ message: 'Rol no válido' });

        // Encriptar password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const usuario = await Usuario.create({
            id_persona: persona.id_persona,
            id_rol: rolDb.id_rol,
            email,
            password: hash
        });

        res.json({ message: 'Usuario registrado correctamente', usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el registro', error });
    }
};

// 🔹 Login
export const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({
            where: { email },
            include: [{ model: Rol }, { model: Persona }]
        });
        if (!usuario) return res.status(400).json({ message: 'Usuario no encontrado' });

        const validPassword = await bcrypt.compare(password, usuario.password);
        if (!validPassword) return res.status(400).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: usuario.id_usuario, rol: usuario.Rol.nombre },
            secretKey, { expiresIn: '8h' }
        );

        res.json({
            message: 'Login exitoso',
            token,
            usuario: {
                id: usuario.id_usuario,
                nombre: usuario.Persona.nombres,
                rol: usuario.Rol.nombre,
                email: usuario.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el login', error });
    }
};