const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Carrera = sequelize.sequelize.define('carreras', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: null
    }
});

module.exports = Carrera;

