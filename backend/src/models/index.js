import sequelize from '../config/database.js';
import Persona from './personaModel.js';
import Rol from './rolModel.js';
import Usuario from './usuarioModel.js';
import Conductor from './conductorModel.js';
import Vehiculo from './vehiculoModel.js';
import Pasajero from './pasajeroModel.js';
import Region from './regionModel.js';
import SolicitudViaje from './solicitudViajeModel.js';
import Log from './logModel.js';

// Relaciones
Rol.hasMany(Usuario, { foreignKey: 'id_rol' });
Usuario.belongsTo(Rol, { foreignKey: 'id_rol' });

Persona.hasOne(Usuario, { foreignKey: 'id_persona' });
Usuario.belongsTo(Persona, { foreignKey: 'id_persona' });

Persona.hasOne(Conductor, { foreignKey: 'id_persona' });
Conductor.belongsTo(Persona, { foreignKey: 'id_persona' });

Conductor.hasMany(Vehiculo, { foreignKey: 'id_conductor' });
Vehiculo.belongsTo(Conductor, { foreignKey: 'id_conductor' });

Persona.hasOne(Pasajero, { foreignKey: 'id_persona' });
Pasajero.belongsTo(Persona, { foreignKey: 'id_persona' });

Region.hasMany(SolicitudViaje, { foreignKey: 'id_region' });
SolicitudViaje.belongsTo(Region, { foreignKey: 'id_region' });

Pasajero.hasMany(SolicitudViaje, { foreignKey: 'id_pasajero' });
SolicitudViaje.belongsTo(Pasajero, { foreignKey: 'id_pasajero' });

Conductor.hasMany(SolicitudViaje, { foreignKey: 'id_conductor' });
SolicitudViaje.belongsTo(Conductor, { foreignKey: 'id_conductor' });

Usuario.hasMany(Log, { foreignKey: 'id_usuario' });
Log.belongsTo(Usuario, { foreignKey: 'id_usuario' });

export default { sequelize, Persona, Rol, Usuario, Conductor, Vehiculo, Pasajero, Region, SolicitudViaje, Log };