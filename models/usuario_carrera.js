const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Importa el modelo User
const Carrera = require('./Carrera'); // Importa el modelo Carrera

const UsuarioCarrera = sequelize.sequelize.define('usuario_carreras', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
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

module.exports = UsuarioCarrera;

