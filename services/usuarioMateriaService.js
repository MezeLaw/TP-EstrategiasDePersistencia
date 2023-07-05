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
            attributes: ["id"],
            where: { usuario_id : usuarioId }
        });
        
        const materias =
        (materiasIdsByUserId.length === 0)
          ? []
          : await Materia.findAll({
              where: { id: { [Op.in]: materiasIdsByUserId } }
            });                
        return materias;
    } catch (err) {
        console.error('Error al consultar las materias inscriptas del usuario provisto:', err);
        throw new Error('Error al consultar las materias inscriptas del usuario provisto');
    }
}

module.exports = {
    inscribirUsuarioEnMateria,
    getMateriasUsuarioInscripto
};
