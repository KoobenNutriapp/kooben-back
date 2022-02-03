const express = require('express')
const recipe = require('../routers/recipe.router')
const ingredient = require('../routers/ingredient.router')
const payment = require('../routers/payment.router')
const logger = require('../middlewares/logger')
const user = require('../routers/user.router')
const cors = require('cors')
const server = express()

const errorController = require('../controllers/error');
//Middleware
server.use(cors({
	origin:'*'
}))

server.use(express.json())
server.use(logger)


//Routes
server.get('/',(req,res)=>res.send('Bienvenido a Kooben Balan, David, Mora, Oscar, Rafa'))
server.use('/recipe',recipe)
server.use('/ingredient',ingredient)
server.use('/payment',payment)
server.use('/user',user)

// 404 - NOT- FOUND
server.use(errorController.get404);

module.exports = server
