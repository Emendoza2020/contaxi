import bcrypt from 'bcrypt';
import Usuario from '../models/usuarioModel.js';
import Persona from '../models/personaModel.js';
import Rol from '../models/rolModel.js';
import '../models/index.js';

export const createUsuario = async(req, res) => {
    const { email, password, id_persona, id_rol } = req.body;
    if (!email || !password || !id_persona || !id_rol) return res.status(400).json({ message: 'Faltan campos obligatorios' });

    try {
        const existing = await Usuario.findOne({ where: { email } });
        if (existing) return res.status(400).json({ message: 'Email ya registrado' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const usuario = await Usuario.create({...req.body, password: hashedPassword });
        res.status(201).json(usuario);
    } catch (err) {
        res.status(500).json({ message: 'Error creando usuario', error: err.message });
    }
};

export const getUsuarios = async(req, res) => {
    try {
        const usuarios = await Usuario.findAll({ include: [Persona, Rol] });
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ message: 'Error obteniendo usuarios', error: err.message });
    }
};

export const getUsuarioById = async(req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id, { include: [Persona, Rol] });
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ message: 'Error obteniendo usuario', error: err.message });
    }
};

export const updateUsuario = async(req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

        if (req.body.password) req.body.password = await bcrypt.hash(req.body.password, 10);

        await usuario.update(req.body);
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ message: 'Error actualizando usuario', error: err.message });
    }
};

export const deleteUsuario = async(req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

        await usuario.destroy();
        res.json({ message: 'Usuario eliminado' });
    } catch (err) {
        res.status(500).json({ message: 'Error eliminando usuario', error: err.message });
    }
};

export const perfilUsuario = async(req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findOne({
            where: { id_usuario: id },
            include: [
                { model: Persona },
                { model: Rol }
            ]
        });
        if (!usuario)
            return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener perfil", error });
    }
};