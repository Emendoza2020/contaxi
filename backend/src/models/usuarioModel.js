module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Usuario', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING(100), unique: true },
    password: DataTypes.STRING(255),
    estado: { type: DataTypes.TINYINT, defaultValue: 1 },
    id_persona: DataTypes.INTEGER,
    id_rol: DataTypes.INTEGER,
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'usuarios',
    timestamps: false
  });
};
