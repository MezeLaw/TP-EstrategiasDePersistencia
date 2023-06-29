
const Carrera = require('../models/carrera');


async function createCarrera({ name }) {
    try {
        //TODO con el authorization implementado, agregar segurizacion y control de rol en token para crear (solo director)
        const carrera = await Carrera.create({ name });
        return carrera;
    } catch (err) {
        console.error('Error al crear la carrera:', err);
        throw new Error('Error al crear la carrera');
    }
}

async function getCarrera(id) {
    try {
        const carrera = await Carrera.findByPk(id);
        return carrera
    } catch (err) {
        console.error('Error al obtener la carrera con id :', id, err);
        throw new Error('Error al obtener la carrera');
    }
}

async function deleteCarrera(carrera) {
    try {
        carrera.deletedAt = new Date()
        await carrera.save();
        return carrera
    } catch (err) {
        console.error('Error al intentar eliminar la Carrera con id :', Carrera.id, err);
        throw new Error('Error al intentar eliminar la Carrera');
    }
}

async function getCarreras() {
    try {
        const carreras = await Carrera.findAll();
        return carreras
    } catch (err) {
        console.error('Error al intentar obtener las carreras:', err);
        throw new Error('Error intentar obtener las carreras');
    }
}

module.exports = {
    createCarrera,
    getCarrera,
    getCarreras,
    deleteCarrera
};
