const express = require('express');
const activityService = require('../services/activityLogsService');
const jwtMiddleware = require('../jwt');
const router = express.Router();


// Obtener todos los logs
router.get('/', async (req, res) => {
    try {
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
        jwtMiddleware.verifyAndParseToken(req);

        const activities = await activityService.getActivitiesByUsuarioId(userId)
        let response = (activities) ? activities : { success: false, error: 'Logs no encontrados' };
        return res.json(response);
    } catch (err) {
        console.error('Error al obtener los logs:', err);
        return res.status(500).json({ success: false, error: 'Error al obtener los logs' });
    }
});

router.get("/:metodo_http", async (req, res) => {
    const metodoHttp = req.params.metodo_http;
    try {
        jwtMiddleware.verifyAndParseToken(req);

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
    try {
        jwtMiddleware.verifyAndParseToken(req);

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
    try {
        jwtMiddleware.verifyAndParseToken(req);

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
    const fechaInicio = new Date(req.params.fecha_inicio);
    const fechaFin = new Date(req.params.fecha_fin);
    try {
        jwtMiddleware.verifyAndParseToken(req);

        const activities = await activityService.getActivitiesBetweenDates(fechaInicio, fechaFin);
        let response = activities ? activities : { success: false, error: 'Logs no encontrados' };
        return res.json(response);
    } catch (err) {
        console.error('Error al obtener los logs:', err);
        return res.status(500).json({ success: false, error: 'Error al obtener los logs' });
    }
});

// Obtener logs por rango de duración
router.get("/duracion/:duracion_min/:duracion_max", async (req, res) => {
    const duracionMin = parseInt(req.params.duracion_min);
    const duracionMax = parseInt(req.params.duracion_max);
    try {
        jwtMiddleware.verifyAndParseToken(req);

        const activities = await activityService.getActivitiesByDurationRange(duracionMin, duracionMax);
        let response = activities ? activities : { success: false, error: 'Logs no encontrados' };
        return res.json(response);
    } catch (err) {
        console.error('Error al obtener los logs:', err);
        return res.status(500).json({ success: false, error: 'Error al obtener los logs' });
    }
});

// Eliminar log por ID
router.delete("/:id", async (req, res) => {
    const activityId = req.params.id;
    try {
        jwtMiddleware.verifyAndParseToken(req);

        const activity = await activityService.getActivityById(activityId);
        if (!activity) {
            return res.status(404).json({ success: false, error: 'Log no encontrado' });
        }

        const deletedActivity = await activityService.deleteActivity(activity);
        return res.json(deletedActivity);
    } catch (err) {
        console.error('Error al eliminar el log:', err);
        return res.status(500).json({ success: false, error: 'Error al eliminar el log' });
    }
});

module.exports = router;
