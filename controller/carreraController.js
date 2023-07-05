
const carreraService = require('../services/carreraService');
const jwtMiddleware = require("../utils/jwt");
const adminRol = "ADMIN"
const permisosInsuficientes = "El usuario no tiene los permisos necesarios para realizar la operacion"


const getCarreras = async (req, res) => {
    try {
        const carreras = await carreraService.getCarreras()
        res.json(carreras);
    } catch (err) {
        console.error('Error al obtener las carreras:', err);
        res.status(500).json({ error: 'Error al obtener las carreras' });
    }
};

const getCarrerasByID = async (req, res) => {
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
}

const createCarrera = async (req, res) => {
    const { name } = req.body;
    try {
        const tokenParsed = jwtMiddleware.verifyAndParseToken(req);
        const rolTokenValidation = await jwtMiddleware.getRolFromToken(tokenParsed);
        if(rolTokenValidation!== adminRol){
            console.log(permisosInsuficientes)
            res.status(401).json({ error: permisosInsuficientes });
            return
        }
        const carrera = await carreraService.createCarrera({ name });
        res.json(carrera);
    } catch (err) {
        console.error('Error al crear la carrera:', err);
        res.status(500).json({ error: 'Error al crear la carrera' });
    }
}

const deleteCarrera = async (req, res) => {
    const carreraId = req.params.id;
    try {
        const tokenParsed = jwtMiddleware.verifyAndParseToken(req);
        const rolTokenValidation = await jwtMiddleware.getRolFromToken(tokenParsed);
        if(rolTokenValidation!== adminRol){
            console.log(permisosInsuficientes)
            res.status(401).json({ error: permisosInsuficientes });
            return
        }
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
}

module.exports = {
    getCarreras,
    getCarrerasByID,
    createCarrera,
    deleteCarrera,
};
