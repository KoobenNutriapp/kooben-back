const express = require('express')
const recipe = require('../routers/recipe.router')
const ingredient = require('../routers/ingredient.router')
const payment = require('../routers/payment.router')
const logger = require('../middlewares/logger')
const user = require('../routers/user.router')
const User = require('../usecases/user.usecase')
const stripe = require('stripe')(process.env.API_KEY_PAYMENTS);
const bodyParser = require('body-parser');
const stripeKey = require("../usecases/apiKey.usecase");
//const cors = require('cors')
const cors = require('cors')
const server = express()

const errorController = require('../controllers/error');
//Middleware
server.use(cors({
	origin:'*'
}))

server.use(express.json())
server.use(logger)

// 🔥🔥🔥🔥🔥🔥🔥🔥 API 🔥🔥🔥🔥🔥🔥🔥🔥

 ////// Custom API Key Generation & Hashing ///////
  
  // Recursive function to generate a unique random string as API key
  function generateAPIKey() {
    const { randomBytes } = require('crypto');
    const apiKey = randomBytes(16).toString('hex');
    const hashedAPIKey = hashAPIKey(apiKey);
  
    // Ensure API key is unique
    if (apiKeys[hashedAPIKey]) {
      generateAPIKey();
    } else {
      return { hashedAPIKey, apiKey };
    }
  }
  
  // Hash the API key
  function hashAPIKey(apiKey) {
    const { createHash } = require('crypto');
  
    const hashedAPIKey = createHash('sha256').update(apiKey).digest('hex');
  
    return hashedAPIKey;
  }

// Register for API
server.use('/stripe',payment)

// Monitor & API usage -- COMENT FUNCTION FOR DEVELOPMENT
server.all('*', async (req, res, next) => {
    // const { apiKey } = req.query;
    console.log('Validacion de token')
    // console.log(req.headers)
    // let apiKey = 'true'
    let customerId = 'none'
    const apiKey = req.headers['x-api-key'] ? req.headers['x-api-key'] : 'false' // better option for storing API keys
    console.log(apiKey + " == " + 'false')
    if (apiKey === 'false') {
        res.statusCode = 400
        res.json({
            success: false,
            message: 'Missing api key'
        })
        return
    }
    if(apiKey != 'false'){
      // check if accouunt is active
      console.log('Checking hashed API')
      const hashedAPIKey =  hashAPIKey(apiKey);
      console.log('hashedAPIKey')
      console.log(hashedAPIKey)
      console.log('GetCustomerID')
      customerId = await stripeKey.getCustomerID(hashedAPIKey)
      console.log(customerId)
    }
    
    if (customerId === 'none') {
      res.sendStatus(403); // not authorized
      return
    } else {
    
        // get user
        const customer = await User.getUserById(customerId)
        console.log('Customer')
        console.log(customer)
        // Record usage with Stripe Billing
        const record = await stripe.subscriptionItems.createUsageRecord(
        customer.stripeCustomer.itemId,
        {
            quantity: 1,
            timestamp: 'now',
            action: 'increment',
        }
        );

    next();
    }
  });

//Routes
server.get('/',(req,res)=>res.send('Bienvenido a Kooben Balan, David, Mora, Oscar, Rafa'))
server.use('/recipe',recipe)
server.use('/ingredient',ingredient)
server.use('/payment',payment)
server.use('/user',user)  

// Customer API usage report  
server.get('/usage/:customer', async (req, res) => {
const customerId = req.params.customer;
const invoice = await stripe.invoices.retrieveUpcoming({
    customer: customerId,
});

res.send(invoice);
});

// 404 - NOT- FOUND
server.use(errorController.get404);

module.exports = server
