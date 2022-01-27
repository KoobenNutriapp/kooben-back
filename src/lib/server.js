const express = require('express')
const recipe = require('../routers/recipe.router')
const ingredient = require('../routers/ingredient.router')
const logger = require('../middlewares/logger')
//const cors = require('cors')
const server = express()

const errorController = require('../controllers/error');
//Middleware
// server.use(cors({
// 	origin:'*'
// }))

server.use(express.json())
server.use(logger)


//Routes
server.get('/',(req,res)=>res.send('Bienvenido a kobeen'))
server.use('/recipe',recipe)
server.use('/ingredient',ingredient)

// 404 - NOT- FOUND
server.use(errorController.get404);

module.exports = server