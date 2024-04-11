const express = require('express')
const router = express.Router() //dentro de express hay un metodo Router
const {getCitas, createCitas, updateCitas, deleteCitas} = require('../controllers/citasController')

router.get('/', getCitas)

router.post('/', createCitas)

router.put('/:id', updateCitas)

router.delete('/:id', deleteCitas)

module.exports = router