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
              'http://localhost:80/dashboard?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:80/error',
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
            message: 'Could not update recipe',
            error,
        })
    }
}

module.exports = {
    checkout
}