import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Log = sequelize.define('Log', {
    id_log: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_usuario: { type: DataTypes.INTEGER },
    accion: { type: DataTypes.STRING(100) },
    descripcion: { type: DataTypes.TEXT },
    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    tableName: 'log',
    timestamps: false
});

export default Log;