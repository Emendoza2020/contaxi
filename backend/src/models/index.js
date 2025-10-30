const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Persona = require('./personaModel')(sequelize, Sequelize.DataTypes);
const Usuario = require('./usuarioModel')(sequelize, Sequelize.DataTypes);
const Rol = require('./rolModel')(sequelize, Sequelize.DataTypes);
const Conductor = requiere('./conductorModel')(sequelize.DataTypes);

// Relaciones
Usuario.belongsTo(Persona, { foreignKey: 'id_persona' });
Usuario.belongsTo(Rol, { foreignKey: 'id_rol' });

Conductor.belongsTo(Persona, { foreignKey: 'id_persona' });
Conductor.belongsTo(Usuario, { foreignKey: 'id_usuario' });

module.exports = { sequelize, Persona, Usuario, Rol, Conductor };