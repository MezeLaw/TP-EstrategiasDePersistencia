//En este router vamos a manejar la inscripcion a carreras y materias. Actualmente no tiene seguridad pero la tendra validando jwt
const express = require('express');

const userService = require("../services/userService");
const carreraService = require('../services/carreraService')
const usuarioCarreraService = require('../services/usuarioCarreraService')
const jwtMiddleware = require("../jwt");

const router = express.Router();

router.post('/carrera/:carreraId/usuario/:userId', async (req, res) => {

    const userId = req.params.carreraId;
    const carreraId = req.params.userId;

    const tokenParsed = jwtMiddleware.verifyAndParseToken(req);
    const validationToken = await jwtMiddleware.tokenValidationWithId(tokenParsed, userId);
    if(validationToken){
        throw Error(validationToken);
    }

    try {
        const user = await userService.getUser(userId);
        const carrera = await carreraService.getCarrera(carreraId)

        if (!user || !carrera) {
            res.status(404).json({ error: 'Usuario o carrera no encontrados' });
        }
        const usuarioCarrera = await usuarioCarreraService.inscribirUsuarioEnCarrera(userId, carreraId)
        if (usuarioCarrera == null) {
            res.status(500).json({ error: 'Ocurrio un error al intentar realizar la inscripcion' });
        } else {
            res.json(usuarioCarrera);
        }
    } catch (err) {
        console.error('Error al registrar la carrera para el usuario:', err);
        res.status(500).json({ error: 'Error al registrar la carrera para el usuario' });
    }
});

//TODO agregar endpoint para consultar carreras en las que el usuario esta anotado

module.exports = router;
