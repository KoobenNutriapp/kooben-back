const express = require('express')

const controller = require('../controllers/user.controller')

const router = express.Router()

router.post('/',controller.createUser)

router.get('/',controller.getAllUsers)

router.get('/:id',controller.getUserById)

router.delete('/:id',controller.deleteUser)

module.exports = router