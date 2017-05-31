'use strict'
const app = require('express')()
const bodyParser = require('body-parser')
const PORT = 8081

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({'extended': 'true'}))
  .use('/auth', require('./components/routes/auth'))
  .use('/user', require('./components/routes/user'))

/* istanbul ignore if  */
if (require.main === module) app.listen(PORT, '0.0.0.0')

module.exports = app
