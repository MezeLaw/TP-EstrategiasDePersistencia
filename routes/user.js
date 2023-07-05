const express = require('express');
const { performance } = require('perf_hooks');
const userService = require('../services/userService');
const activityService = require('../services/activityLogsService');
const jwtMiddleware = require('../utils/jwt');;
const router = express.Router();
const adminRol = "ADMIN"
const permisosInsuficientes = "El usuario no tiene los permisos necesarios para realizar la operacion"

// Get users
router.get('/', async (req, res) => {
    try {
        const tokenParsed = jwtMiddleware.verifyAndParseToken(req);
        const rolTokenValidation = await jwtMiddleware.getRolFromToken(tokenParsed);
        if(rolTokenValidation!== adminRol){
            console.log(permisosInsuficientes)
            throw Error(permisosInsuficientes);
        }
        const users = await userService.getUsers();
        res.json(users);
    } catch (err) {
        console.error('Error al obtener los usuarios:', err.toString());
        res.status(500).json({ error: 'Error al obtener los usuarios.' + err.toString() });
    }
});

// Get users con paginado
router.get('/:pagina_actual/:cantidad_a_ver', async (req, res) => {
    try {
      const paginaActual = parseInt(req.params.pagina_actual) || 1;
      const cantidadAVer = parseInt(req.params.cantidad_a_ver) || 10;
        console.log("asdas");
      const users = await userService.getUsersWithPagination(paginaActual, cantidadAVer);
      res.json(users);
    } catch (err) {
        console.error('Error al obtener los usuarios:', err.toString());
        res.status(500).json({ error: 'Error al obtener los usuarios.' + err.toString() });
    }
});

//Get by id
router.get("/:id", async (req, res) => {
    const userId = req.params.id;
    const start = performance.now();

    try {
        const tokenParsed = jwtMiddleware.verifyAndParseToken(req);
        const validationToken = await jwtMiddleware.tokenValidationWithId(tokenParsed, userId);
        const rolTokenValidation = await jwtMiddleware.getRolFromToken(tokenParsed);
        if(validationToken && rolTokenValidation!==adminRol){
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
    const { name, lastname, dni, email, password, rol } = req.body;
    try {
        const user = await userService.createUser({ name, lastname, dni, email, password, rol });
        res.json(user);
    } catch (err) {
        console.error('Error al crear el usuario:', err);
        res.status(500).json(err.toString());
    }
});

//Delete user
router.delete("/:id",async (req, res) => {
    const userId = req.params.id;
    //TODO agregar validacion de id nulo, 400
    try {
        const tokenParsed = jwtMiddleware.verifyAndParseToken(req);
        const rolTokenValidation = await jwtMiddleware.getRolFromToken(tokenParsed);
        if(rolTokenValidation!== adminRol){
            console.log(permisosInsuficientes)
            res.status(401).json({ error: permisosInsuficientes });
            return
        }

        const user = await userService.getUser(userId)
        if (user) {
             const deletedUser = await userService.deleteUser(user)
            res.status(200).json({deletedUser})
            return
        }
        res.status(404).json({ error: 'Usuario no encontrado' });
        return
    }  catch (err) {
        console.error('Error al buscar el usuario:', err);
        res.status(500).json({ error: 'Error al buscar el usuario' });
    }
});



module.exports = router;
