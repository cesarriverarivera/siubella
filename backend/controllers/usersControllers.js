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
        password: hashedPassword,
        esAdmin
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

    const {email, password} = req.body

    //buscar un usuario con el email dado
    const user = await User.findOne({email})

    //si el usario existe,verificamos tambien el password
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            esAdmin: user.esAdmin,
            token: genToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Credenciales incorrectas')
    }
})

const userData = asyncHandler( async (req, res) => {
    res.status(200).json(req.user)
})

//funcion para generar el token
const genToken = (id_usuario) => {
    return jwt.sign({id_usuario}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    createUser,
    loginUser,
    userData
}