'use strict'
const express = require('express')
const app = express()
const server = require('http').Server(app)
// const io = require('socket.io')(server)
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const uuid = require('uuid/v4')
const fs = require('fs')
const PORT = process.env.PORT || 8082

/* -------------------------Express Config------------------------- */
/**
 * CORS Middleware
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 * @param {function()} next - Executes normal Route logic
 */
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:12345')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Cache-Control')
  res.header('Access-Control-Allow-Credentials', true)
  next()
}

app
    .use(allowCrossDomain)
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({'extended': 'true'}))
    .use(cookieParser())
    .use(session({
      secret: 'wellThisStringIsSoDamnSecureIcanTotallyHardcodeIt', // works for the demo. use vault and deployment pipeline to inject secret for prod
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }, // dev. 'true' only sets cookies for SSL/TLS connection
      genid: req => {
        return uuid() // give every session a unique ID
      }
    }))
    .use('/', express.static('./public'))
    .use('/node_modules', express.static('./node_modules'))

/* -------------------------Route Definitions------------------------- */
fs
    .readdirSync('./components/routes')
    .forEach(file => { // reads every route definition and imports it
      app.use('/' + file.replace('.js', ''), require('./components/routes/' + file))
    })
app.use((req, res) => res.redirect('/')) // redirects invalid requests to landing page

/* -------------------------Socket.io Stuff------------------------- */

/* istanbul ignore if  */
if (require.main === module) {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`)
  })
}

module.exports = app
