const ApiKey = require ('../models/api.model')


async function saveApiKey(credential) {
    // return ApiKey.set(credential.apikey, credential.customerID)
    const newkey = new ApiKey({
      socialHandles: {
        [credential.apikey]: credential.customerID,
      }
    })
    newkey.save(function(err, result){
      if(err){
          console.log('>>>>>> Error');
          console.log(err)
          return err
      }else{
          console.log('>>>>>> ' + JSON.stringify(result, null, 4));
          return result
      }
  });
    // return await ApiKey.socialHandles.set('credential.apikey', 'credential.customerID');
  }

async function getKeys(){
  return await ApiKey.find();
}


async function getCustomerID(apikey){
  // console.log(ApiKey.findOne({ 'socialHandles.github': 'vkarpov15' }))
  console.log('searching: apiKey')
  // console.log(apikey)
  const apiKeys = await getKeys()
  let res = {};
  apiKeys.forEach((item)=>{
    const key = new ApiKey(item)
    console.log('searching: ')
    // console.log(key)
    // console.log(key.socialHandles + " == " + apikey)
    if(key.socialHandles.get(apikey)){
      console.log('Encontrado')
      // console.log(item)
      res = key.socialHandles.get(apikey)
      // console.log(key.socialHandles.get(apikey))
    }
  })
  return res
}

async function getApiKey(){
  return 'Working feature'
}

async function deleteApiKey(id){
  return await ApiKey.findByIdAndRemove(id)
}

module.exports = {
  saveApiKey,
  getKeys,
  getCustomerID,
  getCustomerID,
  deleteApiKey
}