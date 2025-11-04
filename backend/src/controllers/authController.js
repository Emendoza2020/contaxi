import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuarioModel.js';
import Persona from '../models/personaModel.js';
import Rol from '../models/rolModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_secreta';

export const register = async(req, res) => {
    const { nombres, apellidos, ci, telefono, direccion, email, password, rolNombre } = req.body;

    // 1️⃣ Validación manual de campos obligatorios
    if (!nombres) return res.status(400).json({ message: "El campo 'nombres' es obligatorio" });
    if (!apellidos) return res.status(400).json({ message: "El campo 'apellidos' es obligatorio" });
    if (!ci) return res.status(400).json({ message: "El campo 'ci' es obligatorio" });
    if (!email) return res.status(400).json({ message: "El campo 'email' es obligatorio" });
    if (!password) return res.status(400).json({ message: "El campo 'password' es obligatorio" });
    if (!rolNombre) return res.status(400).json({ message: "El campo 'rolNombre' es obligatorio" });

    try {
        // 2️⃣ Verificar si el email ya existe
        const existingUser = await Usuario.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: 'El email ya está registrado' });

        // 3️⃣ Crear persona
        let persona;
        try {
            persona = await Persona.create({ nombres, apellidos, ci, telefono, direccion });
        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message: "El CI ya está registrado" });
            }
            return res.status(500).json({ message: 'Error creando persona', error: err.message });
        }

        // 4️⃣ Buscar rol
        const rol = await Rol.findOne({ where: { nombre: rolNombre } });
        if (!rol) return res.status(400).json({ message: `El rol '${rolNombre}' no existe` });

        // 5️⃣ Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // 6️⃣ Crear usuario con el id_rol correcto
        const usuario = await Usuario.create({
            id_persona: persona.id_persona,
            id_rol: rol.id_rol, // ✅ aquí está la corrección
            email,
            password: hashedPassword,
            estado: 'activo',
        });

        res.status(201).json({ message: 'Usuario registrado correctamente', usuario });

    } catch (err) {
        res.status(500).json({ message: 'Error en registro', error: err.message });
    }
};


// Login
export const login = async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'Faltan campos obligatorios' });

    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: usuario.id_usuario, email: usuario.email }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({
            message: 'Login exitoso',
            usuario: {
                id: usuario.id_usuario,
                email: usuario.email,
                id_rol: usuario.id_rol
            },
            token
        });
    } catch (err) {
        res.status(500).json({ message: 'Error en login', error: err.message });
    }
};