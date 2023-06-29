const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Importa el modelo User
const Materia = require('./Materia'); // Importa el modelo Materia

const UsuarioMateria = sequelize.sequelize.define('usuario_materias', {
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
    materia_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Materia,
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

module.exports = UsuarioMateria;

