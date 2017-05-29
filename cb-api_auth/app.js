'use strict'
const app = require('express')()
const bodyParser = require('body-parser')
const bcryptUtil = require('./components/bcryptUtil')
const PORT = 8081

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({'extended': 'true'}))
  .use('/', require('./components/routes/userRoutes'))

/* istanbul ignore if  */
if (require.main === module) app.listen(PORT, '0.0.0.0')

module.exports = app
