const bcrypt = require('bcrypt');
const User = require('../models/user');


async function createUser({ name, lastname, dni, email, password }) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, lastname, dni, email, password: hashedPassword });
        return user;
    } catch (err) {
        console.error('Error al crear el usuario:', err);
        throw new Error('Error al crear el usuario');
    }
}

async function getUser(id) {
    try {
        const user = await User.findByPk(id);
        return user
    } catch (err) {
        console.error('Error al obtener el usuario con id :', id, err);
        throw new Error('Error al obtener el usuario');
    }
}

async function getUsers() {
    try {
        const users = await User.findAll();
        return users
    } catch (err) {
        console.error('Error al intentar obtener los usuarios:', err);
        throw new Error('Error intentar obtener los usuarios');
    }
}

module.exports = {
    createUser,
    getUser,
    getUsers
};
