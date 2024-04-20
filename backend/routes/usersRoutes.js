const express = require('express')
const router = express.Router()
const {createUser, loginUser, userData} = require('../controllers/usersControllers')

router.post('/', createUser)
router.post('/login', loginUser)
router.get('/datos', userData)

module.exports = router