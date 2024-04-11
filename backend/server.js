const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express() //para inicializar la aplicacion

//cuando en postman use /api/citas buscara en routes y citasroutes
app.use('/api/citas', require('./routes/citasRoutes')) 

app.listen(port, () => console.log(`servidor inciado en el puerto ${port}`))