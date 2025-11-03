import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Vehiculo = sequelize.define('Vehiculo', {
    id_vehiculo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_conductor: { type: DataTypes.INTEGER, allowNull: false },
    placa: { type: DataTypes.STRING(15), allowNull: false, unique: true },
    marca: { type: DataTypes.STRING(50) },
    modelo: { type: DataTypes.STRING(50) },
    anio: { type: DataTypes.INTEGER },
    color: { type: DataTypes.STRING(30) },
    capacidad: { type: DataTypes.INTEGER, defaultValue: 4 },
    estado: { type: DataTypes.STRING(20), defaultValue: 'activo' },
    fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    tableName: 'vehiculo',
    timestamps: false
});

export default Vehiculo;