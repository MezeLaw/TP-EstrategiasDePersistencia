'use strict';
module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define('materia', {
    id_carrera: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  return materia;
};
