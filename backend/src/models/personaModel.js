import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Persona = sequelize.define('Persona', {
    id_persona: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombres: { type: DataTypes.STRING(100), allowNull: false },
    apellidos: { type: DataTypes.STRING(100), allowNull: false },
    ci: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    telefono: { type: DataTypes.STRING(20) },
    direccion: { type: DataTypes.STRING(150) },
    fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    tableName: 'persona',
    timestamps: false
});

export default Persona;