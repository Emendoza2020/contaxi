const { Rol } = require('../models');

// Listar todos los roles
exports.listar = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: 'Error al listar roles', error: err.message });
  }
};

// Crear un nuevo rol
exports.crear = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ message: 'El nombre del rol es requerido' });

    const existe = await Rol.findOne({ where: { nombre } });
    if (existe) return res.status(400).json({ message: 'El rol ya existe' });

    const rol = await Rol.create({ nombre });
    res.json({ message: 'Rol creado correctamente', rol });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear rol', error: err.message });
  }
};

// Actualizar un rol
exports.actualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const rol = await Rol.findByPk(id);
    if (!rol) return res.status(404).json({ message: 'Rol no encontrado' });

    rol.nombre = nombre || rol.nombre;
    await rol.save();

    res.json({ message: 'Rol actualizado correctamente', rol });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar rol', error: err.message });
  }
};

// Eliminar un rol
exports.eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    const rol = await Rol.findByPk(id);
    if (!rol) return res.status(404).json({ message: 'Rol no encontrado' });

    await rol.destroy();
    res.json({ message: 'Rol eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar rol', error: err.message });
  }
};
