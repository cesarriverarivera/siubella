const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

//creo una funcion protectora para proteger endPoints
const protect =asyncHandler( async(req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //obtenemos el token
            token = req.headers.authorization.split(' ')[1]

            //verificamos el token a trave de su firma
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //obtener los datos del usuario del token que pase a traves del payload
            req.user = await User.findById(decoded.id_usuario).select('-password')
    
            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Acceso no autorizado')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('acceso no autorizado,no se ha proporcionado un token')
    }
})

module.exports = {protect}