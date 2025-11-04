import Rol from '../models/rolModel.js';

export const createRol = async(req, res) => {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ message: 'Falta el nombre del rol' });

    try {
        const rol = await Rol.create(req.body);
        res.status(201).json(rol);
    } catch (err) {
        res.status(500).json({ message: 'Error creando rol', error: err.message });
    }
};

export const getRoles = async(req, res) => {
    try {
        const roles = await Rol.findAll();
        res.json(roles);
    } catch (err) {
        res.status(500).json({ message: 'Error obteniendo roles', error: err.message });
    }
};

export const getRolById = async(req, res) => {
    try {
        const rol = await Rol.findByPk(req.params.id);
        if (!rol) return res.status(404).json({ message: 'Rol no encontrado' });
        res.json(rol);
    } catch (err) {
        res.status(500).json({ message: 'Error obteniendo rol', error: err.message });
    }
};

export const updateRol = async(req, res) => {
    try {
        const rol = await Rol.findByPk(req.params.id);
        if (!rol) return res.status(404).json({ message: 'Rol no encontrado' });

        await rol.update(req.body);
        res.json(rol);
    } catch (err) {
        res.status(500).json({ message: 'Error actualizando rol', error: err.message });
    }
};

export const deleteRol = async(req, res) => {
    try {
        const rol = await Rol.findByPk(req.params.id);
        if (!rol) return res.status(404).json({ message: 'Rol no encontrado' });

        await rol.destroy();
        res.json({ message: 'Rol eliminado' });
    } catch (err) {
        res.status(500).json({ message: 'Error eliminando rol', error: err.message });
    }
};