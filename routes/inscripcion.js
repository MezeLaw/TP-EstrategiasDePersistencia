//En este router vamos a manejar la inscripcion a carreras y materias. Actualmente no tiene seguridad pero la tendra validando jwt
const express = require('express');

const userService = require("../services/userService");
const carreraService = require('../services/carreraService')
const usuarioCarreraService = require('../services/usuarioCarreraService')

const router = express.Router();

router.post('/carrera/:carreraId/usuario/:userId', async (req, res) => {

    const userId = req.params.carreraId;
    const carreraId = req.params.userId;
    try {
        const user = await userService.getUser(userId);
        const carrera = await carreraService.getCarrera(carreraId)

        if (!user || !carrera) {
            res.status(404).json({ error: 'Usuario o carrera no encontrados' });
        } else {
            const usuarioCarrera = usuarioCarreraService.inscribirUsuarioEnCarrera(userId, carreraId)
            if (!usuarioCarrera) { // en caso de error no mantiene el app vivo porque esto no es null - no retorna el registro creado en el response
                res.status(500).json({ error: 'Ocurrio un error al intentar realizar la inscripcion' });
            } else {
                res.status(200).json({usuarioCarrera})
            }
        }
    } catch (err) {
        console.error('Error al registrar la carrera para el usuario:', err);
        res.status(500).json({ error: 'Error al registrar la carrera para el usuario' });
    }
});

module.exports = router;
