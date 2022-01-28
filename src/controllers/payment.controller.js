require('dotenv').config();
const stripe = require('stripe')(process.env.API_KEY_PAYMENTS);

async function checkout(request,response){
    try {
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
              'http://localhost:8080/dashboard?session_id={CHECKOUT_SESSION_ID}',
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

async function webhook(request,response){
    try {
        let data;
        let eventType;
        // Check if webhook signing is configured.
        const webhookSecret = process.env.WEBHOOK_SECRET;

        if (webhookSecret) {
            // Retrieve the event by verifying the signature using the raw body and secret.
            let event;
            let signature = req.headers['stripe-signature'];

            try {
            event = stripe.webhooks.constructEvent(
                req['rawBody'],
                signature,
                webhookSecret
            );
            } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`);
            return res.sendStatus(400);
            }
            // Extract the object from the event.
            data = event.data;
            eventType = event.type;
        } else {
            // Webhook signing is recommended, but if the secret is not configured in `config.js`,
            // retrieve the event data directly from the request body.
            data = req.body.data;
            eventType = req.body.type;
        }

        switch (eventType) {
            case 'checkout.session.completed':
            console.log(data);
            // Data included in the event object:
            const customerId = data.object.customer;
            const subscriptionId = data.object.subscription;

            console.log(
                `💰 Customer ${customerId} subscribed to plan ${subscriptionId}`
            );

            // Get the subscription. The first item is the plan the user subscribed to.
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            const itemId = subscription.items.data[0].id;

            // Generate API key
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
            default:
            // Unhandled event type
        }

  res.sendStatus(200);
    } catch (error) {
        
    }
}
module.exports = {
    checkout,
    webhook
}