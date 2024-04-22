const express = require('express')
const router = express.Router()
const {createUser, loginUser, userData} = require('../controllers/usersControllers')
const {protect} = require('../middleware/authMiddleware')

router.post('/', createUser)
router.post('/login', loginUser)
router.get('/datos',protect, userData)

module.exports = router