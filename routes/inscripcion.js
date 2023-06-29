//En este router vamos a manejar la inscripcion a carreras y materias. Actualmente no tiene seguridad pero la tendra validando jwt
const express = require('express');

const userService = require("../services/userService");
const carreraService = require('../services/carreraService')
const materiaService = require('../services/materiaService')
const usuarioCarreraService = require('../services/usuarioCarreraService')
const usuarioMateriaService = require('../services/usuarioMateriaService')
const jwtMiddleware = require("../jwt");

const router = express.Router();

//Inscripcion a carrera
router.post('/carrera/:carreraId/usuario/:userId', async (req, res) => {

    const userId = req.params.userId;
    const carreraId = req.params.carreraId;

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

//Consulta carreras inscriptas
router.get('/carrera/usuario/:userId', async (req, res) => {
    const userId = req.params.userId;

    const tokenParsed = jwtMiddleware.verifyAndParseToken(req);
    const validationToken = await jwtMiddleware.tokenValidationWithId(tokenParsed, userId);
    if(validationToken){
        throw Error(validationToken);
    }

    try {
        const user = await userService.getUser(userId);
        if (!user ) {
            res.status(404).json({ error: 'Usuario no encontrados' });
        }
        const listaCarreras = await usuarioCarreraService.getCarrerasUsuarioInscripto(userId)
        if (listaCarreras == null) {
            res.status(500).json({ error: 'Ocurrio un error al intentar buscar las carreras inscriptas por el usuario' });
        } else {
            res.json(listaCarreras);
        }
    } catch (err) {
        console.error('Error al buscar las carreras inscriptas del usuario:', err);
        res.status(500).json({ error: 'Error al buscar las carreras inscriptas del usuario' });
    }
});


//Inscripcion a materia
router.post('/materia/:materiaId/usuario/:userId', async (req, res) => {

    const userId = req.params.userId;
    const materiaId = req.params.materiaId;

    const tokenParsed = jwtMiddleware.verifyAndParseToken(req);
    const validationToken = await jwtMiddleware.tokenValidationWithId(tokenParsed, userId);
    if(validationToken){
        throw Error(validationToken);
    }

    try {
        const user = await userService.getUser(userId);
        const materia = await carreraService.getCarrera(materiaId)

        if (!user || !materia) {
            res.status(404).json({ error: 'Usuario o materia no encontrados' });
        }
        const usuarioMateria = await usuarioMateriaService.inscribirUsuarioEnMateria(userId, materiaId)
        if (usuarioMateria == null) {
            res.status(500).json({ error: 'Ocurrio un error al intentar realizar la inscripcion' });
        } else {
            res.json(usuarioMateria);
        }
    } catch (err) {
        console.error('Error al registrar la materia para el usuario:', err);
        res.status(500).json({ error: 'Error al registrar la materia para el usuario' });
    }
});

//Consulta materias inscriptas
router.get('/materia/usuario/:userId', async (req, res) => {
    const userId = req.params.userId;

    const tokenParsed = jwtMiddleware.verifyAndParseToken(req);
    const validationToken = await jwtMiddleware.tokenValidationWithId(tokenParsed, userId);
    if(validationToken){
        throw Error(validationToken);
    }

    try {
        const user = await userService.getUser(userId);
        if (!user ) {
            res.status(404).json({ error: 'Usuario no encontrados' });
        }
        const listaMaterias = await usuarioMateriaService.getMateriasUsuarioInscripto(userId)
        if (listaMaterias == null) {
            res.status(500).json({ error: 'Ocurrio un error al intentar buscar las materias inscriptas por el usuario' });
        } else {
            res.json(listaMaterias);
        }
    } catch (err) {
        console.error('Error al buscar las materias inscriptas del usuario:', err);
        res.status(500).json({ error: 'Error al buscar las materias inscriptas del usuario' });
    }
});

module.exports = router;
