const bcrypt = require('bcrypt');
const User = require('../models/user');


async function createUser({ name, lastname, dni, email, password, rol }) {
    try {
        const userByDni = await getUserByDni(dni);
        const userByEmail = await getUserByEmail(email);
        const hashedPassword = await bcrypt.hash(password, 10);
        //TODO mejorar el control al momento de crear usuario
        if (userByDni){
            if(userByDni.deletedAt && (!userByEmail || userByDni.email === (email))){
                return await userUpdateV2(userByDni, { name, lastname, dni, email, password: hashedPassword, rol });
            } else {
                throw new Error('Ya existe un usuario con el dni provisto');
            }
        }
        if(userByEmail){
            throw new Error('Ya existe un usuario con el email provisto');                 
        }
        const user = await User.create({ name, lastname, dni, email, password: hashedPassword, rol });
        return user;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw new Error(error);
    }
}

async function userUpdateV2(user, updatedData) {
    try {
        Object.assign(user, updatedData);
        user.deletedAt = null;

        await user.save();
        return user;
    } catch (err) {
        console.error('Error al actualizar el usuario:', err);
        throw new Error('Error al actualizar el usuario');
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
