import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Region = sequelize.define('Region', {
    id_region: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    departamento: { type: DataTypes.STRING(100), allowNull: false },
    provincia: { type: DataTypes.STRING(100), allowNull: false },
    municipio: { type: DataTypes.STRING(100), allowNull: false },
    descripcion: { type: DataTypes.STRING(200) },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    tableName: 'region',
    timestamps: false
});

export default Region;