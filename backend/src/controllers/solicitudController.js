import { SolicitudViaje, Pasajero, Conductor, Vehiculo, Region } from '../models/index.js';

export const listarSolicitudes = async(req, res) => {
    const solicitudes = await SolicitudViaje.findAll({
        include: [Pasajero, Conductor, Vehiculo, Region]
    });
    res.json(solicitudes);
};

export const crearSolicitud = async(req, res) => {
    try {
        const { id_pasajero, id_region, origen, destino, costo_estimado } = req.body;

        // Validar región
        const region = await Region.findByPk(id_region);
        if (!region || !region.activo)
            return res.status(400).json({ message: 'Región no válida' });

        const solicitud = await SolicitudViaje.create({
            id_region,
            id_pasajero,
            origen,
            destino,
            costo_estimado
        });
        res.json(solicitud);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creando solicitud', error });
    }
};

export const actualizarSolicitud = async(req, res) => {
    const { id } = req.params;
    await SolicitudViaje.update(req.body, { where: { id_solicitud: id } });
    res.json({ message: 'Solicitud actualizada' });
};

export const eliminarSolicitud = async(req, res) => {
    const { id } = req.params;
    await SolicitudViaje.destroy({ where: { id_solicitud: id } });
    res.json({ message: 'Solicitud eliminada' });
};

export const obtenerSolicitudesParaConductor = async(req, res) => {
    try {
        // Filtrar las solicitudes de viaje que están disponibles para el conductor
        const solicitudes = await SolicitudViaje.findAll({
            where: {
                id_conductor: null, // Solo las solicitudes que aún no han sido aceptadas por un conductor
                estado: 'pendiente' // Solicitudes pendientes
            }
        });
        return res.status(200).json(solicitudes);
    } catch (error) {
        console.error('Error al obtener solicitudes de viaje:', error);
        return res.status(500).json({ message: 'Error al obtener las solicitudes' });
    }
};