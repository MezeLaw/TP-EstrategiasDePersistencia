const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const activityLogs = sequelize.sequelize.define('activity_logs', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    usuario_id:{
      type: DataTypes.STRING,
      allowNull: false
    },
    metodo_http: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url_peticion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    respuesta_peticion: {
        type: DataTypes.JSON,
        allowNull: false
    },
    duracion_peticion: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
});

module.exports = activityLogs;

