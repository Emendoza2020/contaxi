import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const SolicitudViaje = sequelize.define('SolicitudViaje', {
    id_solicitud: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_region: { type: DataTypes.INTEGER, allowNull: false },
    id_pasajero: { type: DataTypes.INTEGER, allowNull: false },
    id_conductor: { type: DataTypes.INTEGER },
    id_vehiculo: { type: DataTypes.INTEGER },
    origen: { type: DataTypes.STRING(150), allowNull: false },
    destino: { type: DataTypes.STRING(150), allowNull: false },
    distancia_km: { type: DataTypes.DECIMAL(5, 2) },
    costo_estimado: { type: DataTypes.DECIMAL(10, 2) },
    estado: {
        type: DataTypes.ENUM('pendiente', 'aceptado', 'en_curso', 'finalizado', 'cancelado'),
        defaultValue: 'pendiente'
    },
    fecha_solicitud: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    tableName: 'solicitud_viaje',
    timestamps: false
});

export default SolicitudViaje;