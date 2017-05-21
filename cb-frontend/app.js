'use strict'
const exampleModule = require('./components/exampleModule.js')
const config = require('./components/config/express.json')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const bodyParser = require('body-parser')
const fs = require('fs')
const PORT = process.env.PORT || 8082

/* -------------------------Express Config------------------------- */
const allowCrossDomain = (req, res, next) => {   // CORS middleware
  res.header('Access-Control-Allow-Origin', `http://localhost:12345`)
  res.header('Access-Control-Allow-Headers', 'Content-Type, Cache-Control')
  res.header('Access-Control-Allow-Credentials', true)
  next()
}

app
    .use(allowCrossDomain)
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({'extended': 'true'}))
    .use('/', express.static('./public'))
    .use('/node_modules', express.static('./node_modules'))

/* -------------------------Route Definitions------------------------- */
fs
    .readdirSync('./components/routes')
    .forEach(file => {
      app.use('/' + file.replace('.js', ''), require('./components/routes/' + file))
    })

/* -------------------------Socket.io Stuff------------------------- */

/* istanbul ignore if  */
if (require.main === module) app.listen(PORT, '0.0.0.0')

module.exports = app
