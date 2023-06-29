const express = require('express');
const materiasService = require('../services/materiaService');
const jwtMiddleware = require("../jwt");
const adminRol = "ADMIN"
const permisosInsuficientes = "El usuario no tiene los permisos necesarios para realizar la operacion"
const router = express.Router();

// Get materias
router.get('/', async (req, res) => {
    try {
        const materias = await materiasService.getMaterias()
        res.json(materias);
    } catch (err) {
        console.error('Error al obtener las materias:', err);
        res.status(500).json({ error: 'Error al obtener las materias' });
    }
});

//Get by id
router.get("/:id",async (req, res) => {
    const materiaId = req.params.id;
    try {
        const materia = await materiasService.getMateria(materiaId)
        if (materia) {
            res.json(materia);
        } else {
            res.status(404).json({ error: 'materia no encontrada' });
        }
    }  catch (err) {
        console.error('Error al buscar la materia:', err);
        res.status(500).json({ error: 'Error al buscar la materia' });
    }
});

//Create materia
router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const tokenParsed = jwtMiddleware.verifyAndParseToken(req);
        const rolTokenValidation = await jwtMiddleware.getRolFromToken(tokenParsed);
        if(rolTokenValidation!== adminRol){
            console.log(permisosInsuficientes)
            res.status(401).json({ error: permisosInsuficientes });
            return
        }
        const materia = await materiasService.createMateria({ name });
        res.json(materia);
    } catch (err) {
        console.error('Error al crear la materia:', err);
        res.status(500).json({ error: 'Error al crear la materia' });
    }
});

//Delete materia
router.delete("/:id",async (req, res) => {
    const materiaId = req.params.id;
    try {
        const tokenParsed = jwtMiddleware.verifyAndParseToken(req);
        const rolTokenValidation = await jwtMiddleware.getRolFromToken(tokenParsed);
        if(rolTokenValidation!== adminRol){
            console.log(permisosInsuficientes)
            res.status(401).json({ error: permisosInsuficientes });
            return
        }
        const materia = await materiasService.getMateria(materiaId)
        if (materia) {
             const deletedMateria = await materiasService.deleteMateria(materia)
            res.status(200).json({deletedMateria})
        } else {
            res.status(404).json({ error: 'materia no encontrada' });
        }
    }  catch (err) {
        console.error('Error al buscar la materia:', err);
        res.status(500).json({ error: 'Error al buscar la materia' });
    }
});



module.exports = router;
