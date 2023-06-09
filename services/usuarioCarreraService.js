const UsuarioCarrera = require('../models/usuario_carrera');
const Carrera = require('../models/carrera');
const { Op } = require('sequelize');


async function inscribirUsuarioEnCarrera(usuarioId, carreraId) {
    try {
        const usuarioCarrera = await UsuarioCarrera.create({usuario_id: usuarioId, carrera_id: carreraId });
        return usuarioCarrera;
    } catch (err) {
        console.error('Error al crear la inscripcion a la carrera:', err);
        throw new Error('Error al crear la inscripcion a la carrera');
    }
}

async function getCarrerasUsuarioInscripto(usuarioId) {
    try {
        const carrerasIdsByUserId  = await UsuarioCarrera.findAll({
            attributes: ["carrera_id"],
            where: { usuario_id : usuarioId }
        });

        console.log(carrerasIdsByUserId)

        if (carrerasIdsByUserId.length<1){
            return []
        } else {

            const idList = carrerasIdsByUserId.map(obj => obj.dataValues.carrera_id);

            const carreras = await Carrera.findAll({
                where: { id: { [Op.in]: idList } }
            })
            return carreras
        }
    } catch (err) {
        console.error('Error al consultar las carreras inscriptas del usuario provisto:', err);
        throw new Error('Error al consultar las carreras inscriptas del usuario provisto');
    }
}

module.exports = {
    inscribirUsuarioEnCarrera,
    getCarrerasUsuarioInscripto
};
