const asyncHandler = require('express-async-handler') //paquete que indica cual es el error sin tener que usar try,catch


const getCitas = asyncHandler(async(req, res) => {
    res.status(200).json({
        message: 'get citas'
    })
})

const createCitas = asyncHandler( async(req, res) => {
    
    if(!req.body.fecha) {
        res.status(400)
        throw new Error('por favor especifica una fecha')
    }


    res.status(201).json({
        message: 'crear cita'
    })
})

const updateCitas = asyncHandler( async(req, res) => {
    res.status(200).json({
        message: `modificar la tarea con id ${req.params.id}`
    })
})

const deleteCitas = asyncHandler( async(req, res) => {
    res.status(200).json({
        message: `id: ${req.params.id}`
    })
})

module.exports = {
    getCitas,
    createCitas,
    updateCitas,
    deleteCitas
}