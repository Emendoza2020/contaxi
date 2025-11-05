import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Usuario = sequelize.define('Usuario', {
    id_usuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_persona: { type: DataTypes.INTEGER, allowNull: false },
    id_rol: { type: DataTypes.INTEGER, allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false },
    password: { type: DataTypes.STRING(255), allowNull: false },
    estado: { type: DataTypes.STRING(20), defaultValue: 'activo' },
    fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    tableName: 'usuario',
    timestamps: false
});

export default Usuario;