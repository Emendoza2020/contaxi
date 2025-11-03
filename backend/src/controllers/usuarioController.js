const { Usuario, Persona, Rol } = require('../models');
const bcrypt = require('bcrypt');

exports.listar = async(req, res) => {
    const usuarios = await Usuario.findAll({ include: [Persona, Rol] });
    res.json(usuarios);
};

exports.actualizar = async(req, res) => {
    try {
        const { id } = req.params;
        const { nombres, apellidos, telefono, direccion, id_rol } = req.body;

        const usuario = await Usuario.findByPk(id, { include: Persona });
        if (!usuario) return res.status(404).json({ message: 'No encontrado' });

        await usuario.Persona.update({ nombres, apellidos, telefono, direccion });
        if (id_rol) usuario.id_rol = id_rol;
        await usuario.save();

        res.json({ message: 'Usuario actualizado' });
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar', error: err.message });
    }
};

exports.eliminar = async(req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);
        if (!usuario) return res.status(404).json({ message: 'No encontrado' });
        await usuario.destroy();
        res.json({ message: 'Usuario eliminado' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar', error: err.message });
    }
};