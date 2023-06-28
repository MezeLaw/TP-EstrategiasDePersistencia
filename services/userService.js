const bcrypt = require('bcrypt');
const User = require('../models/user');


async function createUser({ name, lastname, dni, email, password }) {    
    try {
        if (await getUserByDni(dni)){
            throw new Error('Ya existe un usuario con el dni: '+ dni);
        } else if (await getUserByEmail(email)) {
            throw new Error('Ya existe un usuario con el email: '+ email);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, lastname, dni, email, password: hashedPassword });
        return user;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw new Error(error);
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

async function getUserByEmail(email) {
    try {
        const user = await User.findOne({
                attributes: ["id", "email", "password"],
                where: { email }
        });
        return user;
    } catch (err) {
        console.error('Error al obtener el usuario con email :', email, err);
        throw new Error('Error al obtener el usuario');
    }
}

async function getUserByDni(dni) {
    try {
        const user = await User.findOne({
                attributes: ["id", "email", "password"],
                where: { dni }
        });
        return user;
    } catch (err) {
        console.error('Error al obtener el usuario con dni :', dni, err);
        throw new Error('Error al obtener el usuario');
    }
}

async function deleteUser(User) {
    try {
        User.deletedAt = new Date()
        await User.save();
        return User
    } catch (err) {
        console.error('Error al intentar eliminar el usuario con id:', User.id, err);
        throw new Error('Error al intentar eliminar el usuario');
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
    getUsers,
    getUserByEmail,
    getUserByDni,
    deleteUser
};
