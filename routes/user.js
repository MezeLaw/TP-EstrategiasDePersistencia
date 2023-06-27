const express = require('express');
const { performance } = require('perf_hooks');
const userService = require('../services/userService');
const activityService = require('../services/activityLogsService');
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
    const userId = req.params.id;
    const start = performance.now();

    try {
        const tokenParsed = jwtMiddleware.verifyAndParseToken(req);
        const validationToken = await jwtMiddleware.tokenValidationWithId(tokenParsed, userId);
        if(validationToken){
            throw Error(validationToken);
        }
        const user = await userService.getUser(userId);
        let response = (user) ? user : { success: false, error: 'Usuario no encontrado' };

        // Registro de actividad
        await activityService.createActivity({
            usuario_id: tokenParsed.id,
            direccion_ip: req.ip,
            metodo_http: req.method,
            url_peticion: req.originalUrl,
            datos_peticion: req.body,
            respuesta_peticion: response,
            duracion_peticion: performance.now() - start
        });

        return res.json(response);
    } catch (error) {
        console.error('Error al buscar el usuario:', error.message);
        return res.status(500).json({ success: false, error: error.message });
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
        res.status(500).json(err.toString());
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
