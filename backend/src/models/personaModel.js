module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Persona', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombres: DataTypes.STRING(100),
    apellidos: DataTypes.STRING(100),
    ci: DataTypes.STRING(20),
    telefono: DataTypes.STRING(20),
    direccion: DataTypes.STRING(150)
  }, {
    tableName: 'personas',
    timestamps: false
  });
};
