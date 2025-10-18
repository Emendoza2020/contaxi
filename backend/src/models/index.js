const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Persona = require('./personaModel')(sequelize, Sequelize.DataTypes);
const Usuario = require('./usuarioModel')(sequelize, Sequelize.DataTypes);
const Rol = require('./rolModel')(sequelize, Sequelize.DataTypes);

// Relaciones
Usuario.belongsTo(Persona, { foreignKey: 'id_persona' });
Usuario.belongsTo(Rol, { foreignKey: 'id_rol' });

module.exports = { sequelize, Persona, Usuario, Rol };
