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
  
  // Create a Stripe Checkout Session to create a customer and subscribe them to a plan
  server.post('/checkout', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1KMXZcArpXm7B0HUJcKKVElx',
        },
      ],
      // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
      // the actual Session ID is returned in the query parameter when your customer
      // is redirected to the success page.
      success_url:
        'https://www.youtube.com/watch?v=MbqSMgMAzxU&ab_channel=TraversyMedia',
      cancel_url: 'http://localhost:8080/error',
    });
  
    res.send(session);
  });
  
  // Listen to webhooks from Stripe when important events hserveren
  const endpointSecret = "whsec_pvYRoVOJ9f0c1zNeiPR87CPo4StOR34a";

  server.post('/webhook',async (req, res) => {
    const payload = req.body
    const sig = req.headers['stripe-signature']
    const payloadString = JSON.stringify(payload, null, 2);
    const secret = 'whsec_pvYRoVOJ9f0c1zNeiPR87CPo4StOR34a';
    const header = stripe.webhooks.generateTestHeaderString({
            payload: payloadString,
            secret,
    });
    
     let event;
     try {
          event = stripe.webhooks.constructEvent(payloadString, header, secret);
    
     } catch (err) {
            console.log(err)
            console.log(`Webhook Error: ${err.message}`)
            return res.status(400).send(`Webhook Error: ${err.message}`);
     }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':
        console.log('customer.subscription.created');
        console.log(event.data)

    break;
    case 'checkout.session.completed':
      console.log('checkout.session.completed');
      console.log(event);
      // Data included in the event object:
      const customerId = event.data.object.customer;
      const subscriptionId = event.data.object.subscription;

      console.log(
        `💰 Customer ${customerId} subscribed to plan ${subscriptionId}`
      );

      // Get the subscription. The first item is the plan the user subscribed to.
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const itemId = subscription.items.data[0].id;

      // Generate API key
      console.log('GENERATE KEYS')
      const { apiKey, hashedAPIKey } = generateAPIKey();
      console.log(`User's API Key: ${apiKey}`);
      console.log(`Hashed API Key: ${hashedAPIKey}`);

      // Store the API key in your database.
      customers[customerId] = {
        apikey: hashedAPIKey,
        itemId,
        active: true,
      };
      apiKeys[hashedAPIKey] = customerId;

      break;
    case 'invoice.paid':
      // Continue to provision the subscription as payments continue to be made.
      // Store the status in your database and check when a user accesses your service.
      // This approach helps you avoid hitting rate limits.
      break;
    case 'invoice.payment_failed':
      // The payment failed or the customer does not have a valid payment method.
      // The subscription becomes past_due. Notify your customer and send them to the
      // customer portal to update their payment information.
      break;
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeded')
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.sendStatus(200);
});
  
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
