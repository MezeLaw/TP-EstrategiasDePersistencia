const Materia = require('../models/Materia');

async function createMateria({ name, carrera_id }) {
    try {
        const materia = await Materia.create({ name, carrera_id });
        return materia;
    } catch (err) {
        console.error('Error al crear la materia:', err);
        throw new Error('Error al crear la materia');
    }
}

async function getMateria(id) {
    try {
        const materia = await Materia.findByPk(id);
        return materia
    } catch (err) {
        console.error('Error al obtener la materia con id :', id, err);
        throw new Error('Error al obtener la materia');
    }
}

async function deleteMateria(materia) {
    try {
        materia.deletedAt = new Date()
        await materia.save();
        return materia
    } catch (err) {
        console.error('Error al intentar eliminar la materia con id :', materia.id, err);
        throw new Error('Error al intentar eliminar la materia');
    }
}

async function getMaterias() {
    try {
        const materias = await Materia.findAll();
        return materias
    } catch (err) {
        console.error('Error al intentar obtener las materias:', err);
        throw new Error('Error intentar obtener las materias');
    }
}

module.exports = {
    createMateria,
    getMateria,
    getMaterias,
    deleteMateria
};
