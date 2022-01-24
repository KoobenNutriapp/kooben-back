const express = require('express')
const recipe = require('../routers/recipe.router')
const logger = require('../middlewares/logger')
//const cors = require('cors')
const server = express()

//Middleware
// server.use(cors({
// 	origin:'*'
// }))

server.use(express.json())
server.use(logger)


//Routes
server.use('/recipe',recipe)

module.exports = server