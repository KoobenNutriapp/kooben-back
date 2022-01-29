const express = require('express')
const recipe = require('../routers/recipe.router')
const ingredient = require('../routers/ingredient.router')
const payment = require('../routers/payment.router')
const logger = require('../middlewares/logger')
const user = require('../routers/user.router')
const stripe = require('stripe')(process.env.API_KEY_PAYMENTS);
const bodyParser = require('body-parser');
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
server.get('/',(req,res)=>res.send('Bienvenido a Kooben Rafa,Balan, Mora, Paco'))
server.use('/recipe',recipe)
server.use('/ingredient',ingredient)
server.use('/payment',payment)
server.use('/user',user)

// 🔥🔥🔥🔥🔥🔥🔥🔥 API 🔥🔥🔥🔥🔥🔥🔥🔥
////// Data Model ///////

// TODO Implement a real database
// Reverse mservering of stripe to API key. Model this in your preferred database.
const customers = {
    // stripeCustomerId : data
    'stripeCustomerId': {
      apiKey: '123xyz',
      active: false,
      itemId: 'stripeSubscriptionItemId',
    },
  };
  const apiKeys = {
    // apiKey : customerdata
    '123xyz': 'stripeCustomerId',
  };
  
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
  
  ////// Express API ///////
  
  
  // Get information about the customer
  server.get('/customers/:id', (req, res) => {
    const customerId = req.params.id;
    const account = customers[customerId];
    if (account) {
      res.send(account);
    } else {
      res.sendStatus(404);
    }
  });
  
  // Make a call to the API
  server.get('/api', async (req, res) => {
    const { apiKey } = req.query;
    // const apiKey = req.headers['X-API-KEY'] // better option for storing API keys
  
    if (!apiKey) {
      res.sendStatus(400); // bad request
    }
  
    const hashedAPIKey = hashAPIKey(apiKey);
  
    const customerId = apiKeys[hashedAPIKey];
    const customer = customers[customerId];
    
  
    if (!customer || !customer.active) {
      res.sendStatus(403); // not authorized
    } else {
  
      // Record usage with Stripe Billing
      const record = await stripe.subscriptionItems.createUsageRecord(
        customer.itemId,
        {
          quantity: 1,
          timestamp: 'now',
          action: 'increment',
        }
      );
      res.send({ data: '🔥🔥🔥🔥🔥🔥🔥🔥', usage: record });
    }
  });
  
  server.get('/usage/:customer', async (req, res) => {
    const customerId = req.params.customer;
    const invoice = await stripe.invoices.retrieveUpcoming({
      customer: customerId,
    });
  
    res.send(invoice);
  });

// 🔥🔥🔥🔥🔥🔥🔥🔥 API 🔥🔥🔥🔥🔥🔥🔥🔥
// 404 - NOT- FOUND
server.use(errorController.get404);

module.exports = server
