const mongoose = require('mongoose')

const citaSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    fecha: {
        type: Date,
        required: [true, 'por favor especifica una fecha']
    },
    
    tipoDeServicio: {
        type: String,
        required: [true, 'por favor escoge un tipo de servicio']
    }
    
}, {
    timestamps: true //pone la fecha de creacion y fecha de modificacion automaticamente
})

module.exports = mongoose.model('Cita', citaSchema)