const express = require('express');
const carreraService = require('../services/carreraService');

const router = express.Router();

// Get carreras
router.get('/', async (req, res) => {
    try {
        const carreras = await carreraService.getCarreras()
        res.json(carreras);
    } catch (err) {
        console.error('Error al obtener las carreras:', err);
        res.status(500).json({ error: 'Error al obtener las carreras' });
    }
});

//Get by id
router.get("/:id",async (req, res) => {
    const carreraId = req.params.id;
    try {
        const carrera = await carreraService.getCarrera(carreraId)
        if (carrera) {
            res.json(carrera);
        } else {
            res.status(404).json({ error: 'carrera no encontrada' });
        }
    }  catch (err) {
        console.error('Error al buscar la carrera:', err);
        res.status(500).json({ error: 'Error al buscar la carrera' });
    }
});

//Create carrera
router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const carrera = await carreraService.createCarrera({ name });
        res.json(carrera);
    } catch (err) {
        console.error('Error al crear la carrera:', err);
        res.status(500).json({ error: 'Error al crear la carrera' });
    }
});

//Delete carrera
router.delete("/:id",async (req, res) => {
    const carreraId = req.params.id;
    try {
        const carrera = await carreraService.getCarrera(carreraId)
        if (carrera) {
             const deletedCarrera = await carreraService.deleteCarrera(carrera)
            res.status(200).json({deletedCarrera})
        } else {
            res.status(404).json({ error: 'carrera no encontrada' });
        }
    }  catch (err) {
        console.error('Error al buscar la carrera:', err);
        res.status(500).json({ error: 'Error al buscar la carrera' });
    }
});



module.exports = router;
