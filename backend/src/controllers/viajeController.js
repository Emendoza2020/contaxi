import SolicitudViaje from "../models/solicitudViajeModel";

export const crearSolicitudViaje = async(req, res) => {
    try {
        const {
            id_region,
            id_pasajero,
            id_conductor, // opcional
            id_vehiculo, // opcional
            origen,
            destino,
            distancia_km,
            costo_estimado,
        } = req.body;

        // Validaciones mínimas
        if (!id_region || !id_pasajero || !origen || !destino) {
            return res.status(400).json({
                message: "Faltan datos obligatorios: id_region, id_pasajero, origen, destino",
            });
        }

        const nuevaSolicitud = await SolicitudViaje.create({
            id_region,
            id_pasajero,
            id_conductor: id_conductor,
            id_vehiculo: id_vehiculo,
            origen,
            destino,
            distancia_km: distancia_km ? distancia_km : null,
            costo_estimado: costo_estimado ? costo_estimado : null,
            // estado, fecha_solicitud y fecha_registro usan defaultValue del modelo
        });

        return res.status(201).json({
            message: "Solicitud de viaje creada correctamente",
            data: nuevaSolicitud,
        });
    } catch (error) {
        console.error("Error al crear solicitud de viaje:", error);
        return res.status(500).json({
            message: "Error interno al crear la solicitud de viaje",
        });
    }
};