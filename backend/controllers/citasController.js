const getCitas = (req, res) => {
    res.status(200).json({
        message: 'get citas'
    })
}

const createCitas = (req, res) => {
    res.status(201).json({
        message: 'crear cita'
    })
}

const updateCitas = (req, res) => {
    res.status(200).json({
        message: `modificar la tarea con id ${req.params.id}`
    })
}

const deleteCitas = (req, res) => {
    res.status(200).json({
        message: `id: ${req.params.id}`
    })
}

module.exports = {
    getCitas,
    createCitas,
    updateCitas,
    deleteCitas
}