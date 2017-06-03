'use strict'
const api = require('express').Router()
const dbUtil = require('../dbUtil')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


// ==================================================================
// Define the strategy to be used by PassportJS
passport.use(new LocalStrategy(
  function (name, passwd, done) {
    const userTmp = {name: name, passwd: passwd}
    dbUtil.login(userTmp, (err, result) => {
      result ? done(null, {name: name}) : done(null, false, { message: 'Incorrect username.' })
    })
  }
))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

// Define a middleware function to be used for every secured routes
const auth = (req, res, next) => {
  req.isAuthenticated() ? next() : res.status(401).send()
}
// ==================================================================

api.use(passport.initialize()) // Add passport initialization
api.use(passport.session())    // Add passport initialization

// ==================================================================
// route to test if the user is logged in or not
api.get('/loggedin', (req, res) => {
  res.send(req.isAuthenticated() ? req.user : '0')
})

// route to log in
api.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user)
})

// route to log out
api.post('/logout', (req, res) => {
  req.logOut()
  res.send(200)
})
// ==================================================================

// const validator = (req, res, next) => {
//   (req.body.name && req.body.passwd) ? next() : res.status(400).send('Bad Request')
// }
//
// api
//     .post('/login', validator, (req, res) => {
//       dbUtil.login(req.body, (err, result) => {
//         err ? res.status(500).send(err.detail) : res.status(200).send(result) // send HTTP500 if DB Transaction fails
//       })
//     })
//     .get('/loggedin', (req, res) => {
//       res.status(200).send('0')
//     })
//     .post('/createUser', validator, (req, res) => {
//       dbUtil.createUser(req.body, (err, result) => {
//         if (err) {
//           if (err.detail.includes('already exists')) err.detail = `"${req.body.name}" already exists`
//           res.status(500).send(err.detail)
//         } else {
//           res.status(200).send('ok')
//         }
//       })
//     })
//     .delete('/deleteUser', validator, (req, res) => {
//       dbUtil.deleteUser(req.body, (err, result) => {
//         if (err || result.rowCount === 0) {
//           res.status(500).send('wrong credentials')
//         } else {
//           res.status(200).send('ok')
//         }
//       })
//     })

module.exports = api
