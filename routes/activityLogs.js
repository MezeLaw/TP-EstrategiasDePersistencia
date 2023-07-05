const express = require('express');
const activityService = require('../services/activityLogsService');
const jwtMiddleware = require('../utils/jwt');
const router = express.Router();
const adminRol = "ADMIN"
const permisosInsuficientes = "El usuario no tiene los permisos necesarios para realizar la operacion"

// Obtener todos los logs
router.get('/', async (req, res) => {
    try {
        const tokenParsed = jwtMiddleware.verifyAndParseToken(req);
        const rolTokenValidation = await jwtMiddleware.getRolFromToken(tokenParsed);
        if(rolTokenValidation!== adminRol){
            console.log(permisosInsuficientes)
            res.status(401).json({ error: permisosInsuficientes });
            return
        }
        const activities = await activityService.getActivities()
        res.json(activities);
    } catch (err) {
        console.error('Error al obtener los logs:', err);
        res.status(500).json({ error: 'Error al obtener los logs' });
    }
});

// Obtener por ID de usuario
router.get("/:id_usuario", async (req, res) => {
    const userId = req.params.id_usuario;
    try {
        const tokenParsed = jwtMiddleware.verifyAndParseToken(req);
        const rolTokenValidation = await jwtMiddleware.getRolFromToken(tokenParsed);
        if(rolTokenValidation!== adminRol){
            console.log(permisosInsuficientes)
            res.status(401).json({ error: permisosInsuficientes });
            return
        }

        const activities = await activityService.getActivitiesByUsuarioId(userId)
        let response = (activities) ? activities : { success: false, error: 'Logs no encontrados' };
        return res.json(response);
    } catch (err) {
        console.error('Error al obtener los logs:', err);
        return res.status(500).json({ success: false, error: 'Error al obtener los logs' });
    }
});

router.get("/http/method/:metodo_http", async (req, res) => {
    const metodoHttp = req.params.metodo_http;
    try {
        const tokenParsed = jwtMiddleware.verifyAndParseToken(req);
        const rolTokenValidation = await jwtMiddleware.getRolFromToken(tokenParsed);
        if(rolTokenValidation!== adminRol){
            console.log(permisosInsuficientes)
            res.status(401).json({ error: permisosInsuficientes });
            return
        }

        const activities = await activityService.getActivitiesByHttpMethod(metodoHttp)
        let response = (activities) ? activities : { success: false, error: 'Logs no encontrados' };
        return res.json(response);
    } catch (err) {
        console.error('Error al obtener los logs:', err);
        return res.status(500).json({ success: false, error: 'Error al obtener los logs' });
    }
});

// Obtener logs por endpoint de URL
router.get("/url/:url_peticion", async (req, res) => {
    const urlPeticion = req.params.url_peticion;
    try { // TODO fix request, rompe por el escapeo de chars
        const tokenParsed = jwtMiddleware.verifyAndParseToken(req);
        const rolTokenValidation = await jwtMiddleware.getRolFromToken(tokenParsed);
        if(rolTokenValidation!== adminRol){
            console.log(permisosInsuficientes)
            res.status(401).json({ error: permisosInsuficientes });
            return
        }

        const activities = await activityService.getActivitiesByUrlEndpoint(urlPeticion);
        let response = activities ? activities : { success: false, error: 'Logs no encontrados' };
        return res.json(response);
    } catch (err) {
        console.error('Error al obtener los logs:', err);
        return res.status(500).json({ success: false, error: 'Error al obtener los logs' });
    }
});

router.get("/fecha/:fecha_exacta", async (req, res) => {
    const fechaExacta = new Date(req.params.fecha_exacta);
    try { //TODO mejorar el parseo de la fecha sin tener que usar mas que dd mm aaa
        const tokenParsed = jwtMiddleware.verifyAndParseToken(req);
        const rolTokenValidation = await jwtMiddleware.getRolFromToken(tokenParsed);
        if(rolTokenValidation!== adminRol){
            console.log(permisosInsuficientes)
            res.status(401).json({ error: permisosInsuficientes });
            return
        }

        const activities = await activityService.getActivitiesByExactDate(fechaExacta);
        let response = activities ? activities : { success: false, error: 'Logs no encontrados' };
        return res.json(response);
    } catch (err) {
        console.error('Error al obtener los logs:', err);
        return res.status(500).json({ success: false, error: 'Error al obtener los logs' });
    }
});

// Obtener logs entre dos fechas
router.get("/fecha/:fecha_inicio/:fecha_fin", async (req, res) => {
    const fechaInicio = new Date(req.params.fecha_inicio); //TODO mejorar el parseo de la fecha sin tener que usar mas que dd mm aaa
    const fechaFin = new Date(req.params.fecha_fin);
    try {
        const tokenParsed = jwtMiddleware.verifyAndParseToken(req);
        const rolTokenValidation = await jwtMiddleware.getRolFromToken(tokenParsed);
        if(rolTokenValidation!== adminRol){
            console.log(permisosInsuficientes)
            res.status(401).json({ error: permisosInsuficientes });
            return
        }

        const activities = await activityService.getActivitiesBetweenDates(fechaInicio, fechaFin);
        let response = activities ? activities : { success: false, error: 'Logs no encontrados' };
        return res.json(response);
    } catch (err) {
        console.error('Error al obtener los logs:', err);
        return res.status(500).json({ success: false, error: 'Error al obtener los logs' });
    }
});

// Obtener logs por rango de duración - NOTA: es en unidades enteras que representan milisegundos
router.get("/duracion/:duracion_min/:duracion_max", async (req, res) => {
    const duracionMin = parseInt(req.params.duracion_min);
    const duracionMax = parseInt(req.params.duracion_max);
    try {
        const tokenParsed = jwtMiddleware.verifyAndParseToken(req);
        const rolTokenValidation = await jwtMiddleware.getRolFromToken(tokenParsed);
        if(rolTokenValidation!== adminRol){
            console.log(permisosInsuficientes)
            res.status(401).json({ error: permisosInsuficientes });
            return
        }

        const activities = await activityService.getActivitiesByDurationRange(duracionMin, duracionMax);
        let response = activities ? activities : { success: false, error: 'Logs no encontrados' };
        return res.json(response);
    } catch (err) {
        console.error('Error al obtener los logs:', err);
        return res.status(500).json({ success: false, error: 'Error al obtener los logs' });
    }
});

module.exports = router;
