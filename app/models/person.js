module.exports = (sequelize, DataTypes) => {
  const person = sequelize.define(
    'person',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      id: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
      mail: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: false }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );

  return person;
};
