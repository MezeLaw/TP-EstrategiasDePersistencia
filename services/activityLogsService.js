const ActivityLogs = require("../models/activity_logs");
const { Op } = require('sequelize');


async function createActivity({ usuario_id, metodo_http, url_peticion,  respuesta_peticion, duracion_peticion }) {
    try {
        const activity = await ActivityLogs.create({ usuario_id, metodo_http, url_peticion, respuesta_peticion, duracion_peticion });
        return activity;
    } catch (err) {
        console.error('Error al crear la actividad:', err);
        throw new Error('Error al crear la actividad');
    }
}

async function getActivityById(id) {
    try {
        const activity = await ActivityLogs.findByPk(id);
        return activity
    } catch (err) {
        console.error('Error al obtener la actividad con id :', id, err);
        throw new Error('Error al obtener la actividad');
    }
}

async function getActivitiesByHttpMethod(httpMethod) {
    try {
        const activities = await ActivityLogs.findAll({
                where: { metodo_http : httpMethod }
        });
        return activities;
    } catch (err) {
        console.error('Error al obtener todas las actividades con el hhtp method :', httpMethod, err);
        throw new Error('Error al obtener todas las actividades');
    }
}

async function getActivitiesByUrlEndpoint(url) {
    try {
        const activities = await ActivityLogs.findAll({
                where: { url_peticion : url }
        });
        return activities;
    } catch (err) {
        console.error('Error al obtener todas las actividades con la url :', url, err);
        throw new Error('Error al obtener todas las actividades');
    }
}


async function getActivitiesByExactDate(date) {
    try {
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        
        const activities = await ActivityLogs.findAll({
            where: {
                createdAt: { [Op.between]: [startOfDay, endOfDay] }
            }
        });
        
        return activities;
    } catch (err) {
        console.error('Error al obtener todas las actividades en la fecha:', date, err);
        throw new Error('Error al obtener todas las actividades en la fecha');
    }
}

async function getActivitiesBetweenDates(startDate, endDate) {
    try {
        const startOfDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        const endOfDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1);
        
        const activities = await ActivityLogs.findAll({
            where: {
                createdAt: { [Op.between]: [startOfDay, endOfDay] }
            }
        });        
        return activities;
    } catch (err) {
        console.error('Error al obtener todas las actividades entre fechas:', startDate, endDate, err);
        throw new Error('Error al obtener todas las actividades entre las fechas');
    }
}

async function getActivitiesByDurationRange(minDuration, maxDuration) {
    try {
        const activities = await ActivityLogs.findAll({
            where: {
                duracion_peticion: { [Op.between]: [minDuration, maxDuration] }
            }
        });        
        return activities;
    } catch (err) {
        console.error('Error al obtener todas las actividades por duración:', minDuration, maxDuration, err);
        throw new Error('Error al obtener todas las actividades por duración');
    }
}

async function getActivities() {
    try {
        const activities = await ActivityLogs.findAll();
        return activities;
    } catch (err) {
        console.error('Error al intentar obtener las actividades:', err);
        throw new Error('Error intentar obtener las actividades');
    }
}

async function getActivitiesByUsuarioId(usuarioId) {
    try {
        const activities = await ActivityLogs.findAll({
                where: { usuario_id : usuarioId }
        });
        return activities;
    } catch (err) {
        console.error('Error al obtener todas las actividades con el usuario_id :', usuarioId, err);
        throw new Error('Error al obtener todas las actividades');
    }
}

module.exports = {
    createActivity,
    getActivities,
    getActivityById,
    getActivitiesByUsuarioId,
    getActivitiesBetweenDates,
    getActivitiesByDurationRange,
    getActivitiesByExactDate,
    getActivitiesByHttpMethod,
    getActivitiesByUrlEndpoint
};
