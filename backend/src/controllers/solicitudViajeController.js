import SolicitudViaje from "../models/solicitudViajeModel.js";

export const crearSolicitudViaje = async(req, res) => {
    try {
        const {
            id_region,
            id_pasajero,
            id_conductor,
            id_vehiculo,
            origen,
            destino,
            distancia_km,
            costo_estimado
        } = req.body;

        // Mostrar los datos que llegan para validar
        console.log('Datos recibidos en el backend:', req.body);

        if (!id_region || !id_pasajero || !origen || !destino) {
            return res.status(400).json({
                message: 'Faltan datos obligatorios: id_region, id_pasajero, origen, destino'
            });
        }

        // Intentar crear la solicitud
        const nuevaSolicitud = await SolicitudViaje.create({
            id_region,
            id_pasajero,
            id_conductor: id_conductor ?? null,
            id_vehiculo: id_vehiculo ?? null,
            origen,
            destino,
            distancia_km,
            costo_estimado
        });

        return res.status(201).json({
            message: 'Solicitud de viaje creada correctamente',
            data: nuevaSolicitud
        });

    } catch (error) {
        // Agregar más detalles del error
        console.error('ERROR AL CREAR LA SOLICITUD:', error);
        return res.status(500).json({
            message: 'Error interno al crear la solicitud de viaje',
            error: error.message || 'Error desconocido'
        });
    }
};

export const listarSolicitudes = async(req, res) => {
    try {
        const registros = await SolicitudViaje.findAll();
        return res.status(200).json({ data: registros });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al listar solicitudes" });
    }
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

export const aceptarSolicitud = async(req, res) => {
    try {
        const { id_solicitud, id_conductor } = req.body;

        // Asegurarse de que el conductor es válido
        const solicitud = await SolicitudViaje.findByPk(id_solicitud);

        if (!solicitud || solicitud.estado !== 'pendiente') {
            return res.status(400).json({ message: 'La solicitud no está disponible para aceptar' });
        }

        // Actualizar la solicitud para asignarle al conductor
        solicitud.id_conductor = id_conductor;
        solicitud.estado = 'en_curso'; // Cambiar el estado a 'en curso'
        await solicitud.save();

        return res.status(200).json({
            message: 'Solicitud de viaje aceptada correctamente',
            data: solicitud
        });
    } catch (error) {
        console.error('Error al aceptar la solicitud:', error);
        return res.status(500).json({ message: 'Error interno al aceptar la solicitud de viaje' });
    }
};