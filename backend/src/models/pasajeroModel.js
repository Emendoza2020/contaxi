import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Pasajero = sequelize.define('Pasajero', {
    id_pasajero: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_persona: { type: DataTypes.INTEGER, allowNull: false },
    fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    tableName: 'pasajero',
    timestamps: false
});

export default Pasajero;