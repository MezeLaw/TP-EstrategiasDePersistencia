const express = require('express');
const User = require('../models/user');
const userService = require('../services/userService');
const {deleteUser} = require("../services/userService");
const jwtMiddleware = require('../jwt');

const router = express.Router();

// Get users
router.get('/', async (req, res) => {
    try {
        const users = await userService.getUsers()
        res.json(users);
    } catch (err) {
        console.error('Error al obtener los usuarios:', err);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

//Get by id
router.get("/:id", async (req, res) => {
    const tokenParsed = jwtMiddleware.verifyAndParseToken(req.headers.authorization);
    const userId = req.params.id;
    if (tokenParsed.userId !== userId) {
        return res.status(401).json({ error: 'No estás autorizado' });
    }
    try {
        const user = await userService.getUser(userId)
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    }  catch (err) {
        console.error('Error al buscar el usuario:', err);
        res.status(500).json({ error: 'Error al buscar el usuario' });
    }
});

//Create user
router.post('/', async (req, res) => {
    const { name, lastname, dni, email, password } = req.body;
    try {
        const user = await userService.createUser({ name, lastname, dni, email, password });
        res.json(user);
    } catch (err) {
        console.error('Error al crear el usuario:', err);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});

//Delete user
router.delete("/:id",async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userService.getUser(userId)
        if (user) {
             const deletedUser = await userService.deleteUser(user)
            res.status(200).json({deletedUser})
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    }  catch (err) {
        console.error('Error al buscar el usuario:', err);
        res.status(500).json({ error: 'Error al buscar el usuario' });
    }
});



module.exports = router;
