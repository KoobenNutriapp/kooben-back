require('dotenv').config();
const stripe = require('stripe')(process.env.API_KEY_PAYMENTS);
const user = require("../usecases/user.usecase");
const stripeKey = require("../usecases/apiKey.usecase");
const { sendMail } = require("../services/email.service")

////// Data Model ///////

// TODO Implement a real database
// Reverse mapping of stripe to API key. Model this in your preferred database.
const customers = {
    // stripeCustomerId : data
    stripeCustomerId: {
      apiKey: '123xyz',
      active: false,
      itemId: 'stripeSubscriptionItemId',
    },
  };
  const apiKeys = {
    // apiKey : customerdata
    '123xyz': 'stripeCustomerId',
  };

async function checkout(request,response){
    // price_1KMXZcArpXm7B0HUJcKKVElx
    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
              {
                price: 'price_1KVb7RAqezYdKBDldz2x4rpV',
              },
            ],
            // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
            // the actual Session ID is returned in the query parameter when your customer
            // is redirected to the success page.
            success_url:
              'https://www.youtube.com/?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:8080/error',
          });
        
        response.statusCode = 201
        response.json({
            success: true,
            message: 'Session succesfully created!',
            session
        })
    } catch (error) {
        console.log(error)
        response.statusCode = 500
        response.json({
            success: false,
            message: 'Could not create session',
            error,
        })
    }
}

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

async function webhook(req,res){
    let newUser = {}
    let email = 'notCreated@test.com'
    let idCustomer = '1234'
    let name = 'toChange'
    try {
        console.log('****** WEB HOOK CONTROLLER *********')
        const payload = req.body
        // const sig = req.headers['stripe-signature']
        const payloadString = JSON.stringify(payload, null, 2);
        const secret = process.env.WEBHOOK_SECRET;
        const header = stripe.webhooks.generateTestHeaderString({
                payload: payloadString,
                secret,
        });
        
        let event;
        try {
            event = stripe.webhooks.constructEvent(payloadString, header, secret);
        
        } catch (err) {
                console.log(`Webhook Error: ${err.message}`)
                console.log(err)
                return res.status(400).send(`Webhook Error: ${err.message}`);
        }

    // Handle the event
    switch (event.type) {
        case 'customer.subscription.created':
            console.log('-------customer.subscription.created-------');
            console.log(event.data)

        break;
        case 'customer.created':
            console.log('-------customer.created-------');
            console.log(event.data)
            name =  event.data.object.name
            email = event.data.object.email;
            idCustomer = event.data.object.id
            console.log('------EMAIL------------------')
            console.log(email)
        break;
        case 'checkout.session.completed':
            console.log('---------checkout.session.completed------------');
            console.log(event);
            // Data included in the event object:
            const customerId = event.data.object.customer;
            const subscriptionId = event.data.object.subscription;

            console.log(
                `💰 Customer ${customerId} subscribed to plan ${subscriptionId}`
            );

            // Get the subscription. The first item is the plan the user subscribed to.
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            const customer = await stripe.customers.retrieve(customerId);
            console.log('--------CUSTOMER-INFO--------------')
            // console.log(customer)
            const itemId = subscription.items.data[0].id;
            console.log('--------CUSTOMER-SUBSCRIPTION--------------')
            // console.log(subscription)
            // Generate API key
            console.log('--------CUSTOMER-KEYS--------------')
            const { apiKey, hashedAPIKey } = generateAPIKey();
            console.log(`User's API Key: ${apiKey}`);
            console.log(`Hashed API Key: ${hashedAPIKey}`);

            // Store the API key in your database.
            // customers[customerId] = {
            //     apikey: hashedAPIKey,
            //     itemId,
            //     active: true,
            // };
            // apiKeys[hashedAPIKey] = customerId;

            try {
                newUser = {
                    'id': customerId,
                    'name': customer.name,
                    'status':true,
                    'mail': customer.email,
                    'recipes': [''],
                    'likes': [''],
                    'rol': 'somRol',
                    'type': 'ApiUser',
                    'stripeCustomer':{
                        'id': customerId,
                        'active': true,
                        apiKey: hashedAPIKey,
                        itemId
                    },
                }
                const createdUser = await user.createUser(newUser)
                console.log('---USER CREATED------');
                console.log(createdUser)
                const createApiKeys = await stripeKey.saveApiKey({'apikey':createdUser.stripeCustomer.apiKey,'customerID':createdUser._id});
                const mailResponse = await sendMail(apiKey,newUser)
                console.log('[MAIL RESPONSE]: ' + mailResponse)
                console.log(createApiKeys)
            } catch (error) {
                console.error(error);
                res.statusCode = 500;
                res.json({
                success: false,
                message: "Could not create substription",
                error,
                });
            }

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
        console.log('--------payment_intent.succeeded-------');
        console.log('Payment succeded')
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
        case 'invoice.created':
            console.log('--------invoice created-------');
            console.log(event.data)
            break;
        case 'customer.updated':
            console.log('--------customer.updated-------');
            console.log(event.data)
            break;
        case 'invoice.finalized':
            console.log('--------invoice.finalized-------');
            console.log(event.data)
            break;
        case 'customer.deleted':
            console.log('--------customer.deleted-------');
            console.log(event.data)
            break;
        case 'invoice.payment_succeeded':
            console.log('--------customer.deleted-------');
            console.log(event.data)
            break;
        default:
        console.log(`Unhandled event type ${event.type}`);
    }

        // Return a 200 response to acknowledge receipt of the event
        res.sendStatus(200);
    } catch (error) {
        console.log(error)
    }
}

async function addKey(req,res){
    try{
        console.log(req.body)
        const createApiKeys = await stripeKey.saveApiKey({'apikey': req.body.apiKey,'customerID':req.body._id});
        console.log(createApiKeys)
        res.statusCode = 201
        res.json({
            success: true,
            message: 'AppiKey succesfully Added!',
            data: {
                createApiKeys
            }
        })
    }catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.json({
        success: false,
        message: "Could not add API",
        error,
        });
    }

}


async function getKeys(req,res){
    try{
        const allkeys = await stripeKey.getKeys();
        res.statusCode = 201
        res.json({
            success: true,
            message: 'Keys!',
            data: {
                allkeys
            }
        })
    }catch(err){
        console.error(error);
        res.statusCode = 500;
        res.json({
        success: false,
        message: "Could not get ApiKeys",
        error,
        });
    }
}

async function getCustomerID(req,res){
    const id = req.query.apiKey;
    console.log("id: ", id)
    try{
        const customerId = await stripeKey.getCustomerID(id);
        res.statusCode = 201
        res.json({
            success: true,
            message: 'CostumerID!',
            data: {
                customerId
            }
        })
    }catch(err){
        console.error(err);
        res.statusCode = 500;
        res.json({
        success: false,
        message: "Could not get CustomerID",
        err,
        });
    }
}

async function getApiKey(req,res){
    const id = req.params.customerId;
    try{
        const allkeys = await stripeKey.getApiKey(id);
        res.statusCode = 201
        res.json({
            success: true,
            message: 'Keys!',
            data: {
                allkeys
            }
        })
    }catch(err){
        console.error(error);
        res.statusCode = 500;
        res.json({
        success: false,
        message: "Could not get ApiKey",
        error,
        });
    }
}

async function deleteApiKey(request,response){
    const ApiKeyId = request.params.id;
  try {
    await stripeKey.deleteApiKey(ApiKeyId);

    response.statusCode = 200;
    response.json({
      success: true,
      message: "ApiKey succesfully deleted!",
    });
  } catch (error) {
    console.error(error);
    response.statusCode = 500;
    response.json({
      success: false,
      message: "Could not delete ApiKey",
      error,
    });
  }
}

module.exports = {
    checkout,
    webhook,
    addKey,
    getKeys,
    getCustomerID,
    getApiKey,
    deleteApiKey
}