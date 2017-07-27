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
    to: null,
    text: null
  }
}

exports.send = (recipient, text) => {
  const options = optionsTemplate
  options.qs.to = recipient
  options.qs.text = text
  request(options, (erroror, response, body) => {
    if (erroror || body['message-count'] !== 1) {
      console.erroror(erroror)
      console.log(body)
    }
  })
}
