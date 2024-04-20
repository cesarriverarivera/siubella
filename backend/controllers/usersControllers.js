const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')


const createUser = asyncHandler( async (req, res) => {

    const{name, email, password, esAdmin} = req.body //desestructuro desde el body

    //verificamos que llenen todos los campos
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Faltan datos')
    }
    //verificando que el usuario no exista a traves de su email
    const userExist = await User.findOne({email})
    if(userExist) {
        res.status(400)
        throw new Error('Ese usuario ya existe en la base de datos')
    }

    //hacemos el HASH al password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //crear el usuario
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            esAdmin: user.esAdmin
        })
    } else {
        res.status(400)
        throw new Error('No pudo ser creado el usuario')
    }
})

const loginUser = asyncHandler( async (req, res) => {
    res.status(200).json({message: 'login usuario'})
})

const userData = asyncHandler( async (req, res) => {
    res.status(200).json({message: 'datos del usuario'})
}
)

module.exports = {
    createUser,
    loginUser,
    userData
}