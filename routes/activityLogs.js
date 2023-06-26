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


router.get("/date/:exact_date", async (req, res) => {
    const exactDate = new Date(req.params.exact_date);
    try {
      jwtMiddleware.verifyAndParseToken(req);
  
      const activities = await activityService.getActivitiesByExactDate(exactDate);
      let response = activities ? activities : { success: false, error: 'Logs no encontrados' };
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

// Get activities by IP direction
router.get("/ip/:direccion_ip", async (req, res) => {
    const direccionIp = req.params.direccion_ip;
    try {
      jwtMiddleware.verifyAndParseToken(req);
  
      const activities = await activityService.getActivitiesByIpDirection(direccionIp);
      let response = activities ? activities : { success: false, error: 'Logs no encontrados' };
      return res.json(response);
    } catch (err) {
      console.error('Error al obtener los logs:', err);
      return res.status(500).json({ success: false, error: 'Error al obtener los logs' });
    }
  });
  
  // Get activities by URL endpoint
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
  
  // Get activities between two dates
  router.get("/date/:start_date/:end_date", async (req, res) => {
    const startDate = new Date(req.params.start_date);
    const endDate = new Date(req.params.end_date);
    try {
      jwtMiddleware.verifyAndParseToken(req);
  
      const activities = await activityService.getActivitiesBetweenDates(startDate, endDate);
      let response = activities ? activities : { success: false, error: 'Logs no encontrados' };
      return res.json(response);
    } catch (err) {
      console.error('Error al obtener los logs:', err);
      return res.status(500).json({ success: false, error: 'Error al obtener los logs' });
    }
  });
  
  // Get activities by duration range
  router.get("/duration/:min_duration/:max_duration", async (req, res) => {
    const minDuration = parseInt(req.params.min_duration);
    const maxDuration = parseInt(req.params.max_duration);
    try {
      jwtMiddleware.verifyAndParseToken(req);
  
      const activities = await activityService.getActivitiesByDurationRange(minDuration, maxDuration);
      let response = activities ? activities : { success: false, error: 'Logs no encontrados' };
      return res.json(response);
    } catch (err) {
      console.error('Error al obtener los logs:', err);
      return res.status(500).json({ success: false, error: 'Error al obtener los logs' });
    }
  });
  
  // Delete activity by ID
  router.delete("/:id", async (req, res) => {
    const activityId = req.params.id;
    try {
      jwtMiddleware.verifyAndParseToken(req);
  
      const activity = await activityService.getActivityById(activityId);
      if (!activity) {
        return res.status(404).json({ success: false, error: 'Actividad no encontrada' });
      }
  
      const deletedActivity = await activityService.deleteActivity(activity);
      return res.json(deletedActivity);
    } catch (err) {
      console.error('Error al eliminar la actividad:', err);
      return res.status(500).json({ success: false, error: 'Error al eliminar la actividad' });
    }
  });
  


module.exports = router;
