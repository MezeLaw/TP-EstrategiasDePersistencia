const UsuarioCarrera = require('../models/usuario_carrera');


async function inscribirUsuarioEnCarrera(usuarioId, carreraId) {
    try {
        //TODO con el authorization implementado, agregar segurizacion y control de rol en token para crear (solo director)
        const usuarioCarrera = await UsuarioCarrera.create({usuario_id: usuarioId, carrera_id: carreraId });
        return usuarioCarrera;
    } catch (err) {
        console.error('Error al crear la inscripcion a la carrera:', err);
        throw new Error('Error al crear la inscripcion a la carrera');
    }
}

module.exports = {
    inscribirUsuarioEnCarrera
};
