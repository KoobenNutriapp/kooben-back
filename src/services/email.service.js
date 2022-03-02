// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
require('dotenv').config({path:'../../.env'})


const sendMail =(createdApiKey, user)=>{

    return new Promise((resolve,reject)=>{

        console.log('[API-KEYS]: ' + createdApiKey);
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
            user.mail
            /* more items */
            ]
        },
        Message: { /* required */
            Body: { /* required */
                Html: {
                    Charset: "UTF-8",
                    Data: `<h1>Hoola ${user.name}</h1> 

                    Tu Api keys:  ${createdApiKey}\n
                    customerId: ${user.id}\n
                    Documentación: https://dev-kobenn.s3.amazonaws.com/TamemeRecipes.postman_collection.json.zip
                    Turotial: https://www.loom.com/share/96cca8b41dc5406fa1c80fd8b2d8fa93
                    
                    `
                    
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
        var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

        // Handle promise's fulfilled/rejected states
        sendPromise.then(
        function(data) {
            console.log(data.MessageId);
            resolve(data)
        }).catch(
            function(err) {
            console.error(err, err.stack);
            reject(err)
        });
    })

}


// sendMail('5e891d20de82a036841180ea72e27ad4',{mail : 'gustavo@alluxi.com',id:'1232', name:'Hola'})

module.exports = {
    sendMail
}