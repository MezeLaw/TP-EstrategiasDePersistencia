const UsuarioMateria = require('../models/usuario_materia');
const Materia = require('../models/materia');
const { Op } = require('sequelize');


async function inscribirUsuarioEnMateria(usuarioId, materiaId) {
    try {
        const usuarioMateria = await UsuarioMateria.create({usuario_id: usuarioId, materia_id: materiaId });
        return usuarioMateria;
    } catch (err) {
        console.error('Error al crear la inscripcion a la materia:', err);
        throw new Error('Error al crear la inscripcion a la materia');
    }
}

async function getMateriasUsuarioInscripto(usuarioId) {
    try {
        const materiasIdsByUserId = await UsuarioMateria.findAll({
            attributes: ["materia_id"],
            where: { usuario_id : usuarioId }
        });


        const materias = (materiasIdsByUserId.length === 0)
        if (materias){
            return []
        } else {
            const idList = materiasIdsByUserId.map(obj => obj.dataValues.materia_id);

            const materias = await Materia.findAll({
                where: { id: { [Op.in]: idList } }
            })
           return materias
        }
    } catch (err) {
        console.error('Error al consultar las materias inscriptas del usuario provisto:', err);
        throw new Error('Error al consultar las materias inscriptas del usuario provisto');
    }
}

module.exports = {
    inscribirUsuarioEnMateria,
    getMateriasUsuarioInscripto
};
