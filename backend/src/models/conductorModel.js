module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Conductor', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        id_persona: DataTypes.INTEGER,
        id_usuario: DataTypes.INTEGER,
        id_rol: DataTypes.INTEGER,
        ciudad: DataTypes.STRING(50),
        vehiculo: DataTypes.STRING(50),
        placa: DataTypes.STRING(10),
        licencia: DataTypes.STRING(100),
        carnet: DataTypes.STRING(100),
        fotoVehiculo: DataTypes.STRING(100),
        fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, {
        tableName: 'conductor',
        timestamps: false
    });
};