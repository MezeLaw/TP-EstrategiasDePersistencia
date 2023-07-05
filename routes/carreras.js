const express = require('express');
const { getCarreras, getCarrerasByID, createCarrera, deleteCarrera } = require('../controller/carreraController')


const router = express.Router();

router.get("/", getCarreras)
router.get("/:id",getCarrerasByID)
router.post("/", createCarrera)
router.delete("/:id", deleteCarrera)

module.exports = router;
