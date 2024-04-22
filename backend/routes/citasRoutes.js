const express = require('express')
const router = express.Router() //dentro de express hay un metodo Router
const {getCitas, createCitas, updateCitas, deleteCitas} = require('../controllers/citasController')
const {protect} = require('../middleware/authMiddleware')

router.get('/',protect, getCitas)

router.post('/',protect, createCitas)

router.put('/:id',protect, updateCitas)

router.delete('/:id',protect, deleteCitas)

module.exports = router