const express = require('express');
const activityService = require('../services/activityLogsService');
const jwtMiddleware = require('../jwt');
const router = express.Router();


// Get users
router.get('/', async (req, res) => {
    try {
        const activities = await activityService.getActivities()
        res.json(activities);
    } catch (err) {
        console.error('Error al obtener los logs:', err);
        res.status(500).json({ error: 'Error al obtener los logs' });
    }
});

//Get by id
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


module.exports = router;
