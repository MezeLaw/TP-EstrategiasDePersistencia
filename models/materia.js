const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Carrera = require('./Carrera'); // Importa el modelo Carrera

const Materia = sequelize.sequelize.define('materias', {
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
    carrera_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Carrera,
            key: 'id'
        }
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

module.exports = Materia;

