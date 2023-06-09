const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.sequelize.define('usuarios', {
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
    lastname:{
      type: DataTypes.STRING,
      allowNull: false
    },
    dni:{
        type:DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rol: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "USER"
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

module.exports = User;

