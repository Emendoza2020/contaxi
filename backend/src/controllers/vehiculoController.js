import { Vehiculo, Conductor, Persona } from '../models/index.js';

export const listarVehiculos = async(req, res) => {
    const vehiculos = await Vehiculo.findAll({
        include: [{ model: Conductor, include: [Persona] }]
    });
    res.json(vehiculos);
};

export const crearVehiculo = async(req, res) => {
    const vehiculo = await Vehiculo.create(req.body);
    res.json(vehiculo);
};

export const actualizarVehiculo = async(req, res) => {
    const { id } = req.params;
    await Vehiculo.update(req.body, { where: { id_vehiculo: id } });
    res.json({ message: 'Vehículo actualizado' });
};

export const eliminarVehiculo = async(req, res) => {
    const { id } = req.params;
    await Vehiculo.destroy({ where: { id_vehiculo: id } });
    res.json({ message: 'Vehículo eliminado' });
};