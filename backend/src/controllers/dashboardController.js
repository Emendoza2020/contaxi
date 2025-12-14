import Usuario from '../models/usuarioModel.js';
import Vehiculo from '../models/vehiculoModel.js';

export const obtenerDatosDashboard = async(req, res) => {
    try {
        const usuariosRegistrados = await Usuario.count();
        const conductoresActivos = await Usuario.count({ where: { id_rol: 2 } });
        const pasajerosRegistrados = await Usuario.count({ where: { id_rol: 3 } });
        //const viajesCompletados = await Viaje.count({ where: { estado: 'finalizado' } });
        const vehiculosRegistrados = await Vehiculo.count();

        res.json({
            usuariosRegistrados,
            conductoresActivos,
            pasajerosRegistrados,
            //viajesCompletados,
            vehiculosRegistrados
        });
    } catch (error) {
        console.error('Error al obtener los datos del dashboard', error);
        res.status(500).json({ message: 'Error al obtener los datos' });
    }
};