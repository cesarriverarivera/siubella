const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDb = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000

connectDb()

const app = express() //para inicializar la aplicacion

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//cuando en postman use /api/citas buscara en routes y citasroutes
app.use('/api/citas', require('./routes/citasRoutes')) 

app.use(errorHandler) //le digo al app que estoy usando manejador de errores
 
app.listen(port, () => console.log(`servidor inciado en el puerto ${port}`))