const express = require('express');
const userService = require('../services/userService');
const {deleteUser} = require("../services/userService");
const jwtMiddleware = require('../jwt');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.getUserByEmail(email);
        if(user){
            const passwordMatching = await bcrypt.compare(password, user.password);
            if (passwordMatching) {
                const token = jwtMiddleware.generateToken({
                    id: user.id
                });
                res.json(token);
            } else {
              console.log('La contraseña es incorrecta');
              throw new Error('Credenciales incorrectas');
            }
        }else{
            console.error('No se encontro el usuario con email:', email, err);
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (err) {
        console.error('Error al generar token para usuario con email:', email, err);
        res.status(500).json({ error: 'Error al generar token' });
    }
});


module.exports = router;
