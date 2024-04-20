const asyncHandler = require('express-async-handler') //paquete que indica cual es el error sin tener que usar try,catch
const Cita = require('../models/citasModel')

const getCitas = asyncHandler(async(req, res) => {

    const citas = await Cita.find()
    res.status(200).json(citas)
})

const createCitas = asyncHandler( async(req, res) => {
    
    if(!req.body.fecha) {
        res.status(400)
        throw new Error('por favor especifica una fecha')
    }

    const cita = await Cita.create({
        fecha: req.body.fecha,
        tipoDeServicio: req.body.tipoDeServicio
    })


    res.status(201).json(cita)
})

const updateCitas = asyncHandler( async(req, res) => {

    const cita = await Cita.findById(req.params.id)
    if(!cita) {
        res.status(400)
        throw new Error('esa tarea no existe')
    }

    const citaUpdated = await Cita.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(citaUpdated)
})

const deleteCitas = asyncHandler( async(req, res) => {

    const cita = await Cita.findById(req.params.id)
    if(!cita) {
        res.status(400)
        throw new Error('esa tarea no existe')
    }
    await Cita.deleteOne(cita)

    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getCitas,
    createCitas,
    updateCitas,
    deleteCitas
}