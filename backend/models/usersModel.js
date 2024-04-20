const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor escribe tu nombre']
    },

    email: {
        type: String,
        required: [true, 'Por favor escribe tu email'],
        unique: true  //para indicar que solo puede existir un email igual
    },

    password: {
        type: String,
        required: [true, 'Por favor escribe tu password']
    }, 

    esAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)