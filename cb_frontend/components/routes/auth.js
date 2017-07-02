'use strict'
const api = require('express').Router()
const passport = require('../passportUtil')

api.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user)
})

// route to test if the user is logged in or not
api.get('/loggedin', passport.auth, (req, res) => {
  res.send(req.user)
})

// route to log out
api.post('/logout', passport.auth, (req, res) => {
  req.logOut()
  res.sendStatus(200)
})

module.exports = api
