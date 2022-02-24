// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
require('dotenv').config({path:'../../.env'})


const sendMail =(createdApiKeys, clientEmail)=>{

    console.log('[API-KEYS]: ' + createdApiKeys);
    // Set the region 
    AWS.config.update({
        accessKeyId: process.env.SES_ACCESS_KEY,
        secretAccessKey: process.env.SES_SECRET_KEY,
        region: 'us-east-1'
    });
    
    // Create sendEmail params 
    var params = {
    Destination: { /* required */
        ToAddresses: [
        clientEmail
        /* more items */
        ]
    },
    Message: { /* required */
        Body: { /* required */
            Html: {
                Charset: "UTF-8",
                Data: "<h1>Heeello Moriuks</h1>"
            }
        },
        Subject: {
            Charset: 'UTF-8',
            Data: 'Test email'
        }
        },
    Source: 'luismora371@gmail.com', /* required */
    };

    // Create the promise and SES service object
    // var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

    // // Handle promise's fulfilled/rejected states
    // sendPromise.then(
    // function(data) {
    //     console.log(data.MessageId);
    // }).catch(
    //     function(err) {
    //     console.error(err, err.stack);
    // });

}


sendMail('someKey','koobenkod@gmail.com')

module.exports = {
    sendMail
}