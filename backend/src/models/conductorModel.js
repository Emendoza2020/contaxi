import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Conductor = sequelize.define('Conductor', {
    id_conductor: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_persona: { type: DataTypes.INTEGER, allowNull: false },
    licencia: { type: DataTypes.STRING(30), allowNull: false },
    categoria_licencia: { type: DataTypes.STRING(10) },
    fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    tableName: 'conductor',
    timestamps: false
});

export default Conductor;