'use strict'
const request = require('request')
// create a template with common elements/keys for every request
const optionsTemplate = {
  method: 'GET',
  url: 'https://rest.nexmo.com/sms/json',
  qs: {
    api_key: '5f5ba839',
    api_secret: '380bff46f8f0ed9e',
    from: 'Cognitive-Banking',
    to: '4915207629708',
    text: null
  }
}

exports.send = text => {
  const options = optionsTemplate
  options.qs.text = text
  request(options, (error, response, body) => {
    if (error || body['message-count'] !== '1') {
      console.error(error)
      console.log(body)
    }
  })
}
