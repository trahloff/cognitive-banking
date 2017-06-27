'use strict'
const api = require('express').Router()
const dbUtil = require('../dbUtil')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// ==================================================================
// Define the strategy to be used by PassportJS
passport.use(new LocalStrategy(
   (name, passwd, done) => {
     const userTmp = {name: name, passwd: passwd}
     setTimeout(() => {
       dbUtil.login(userTmp, (err, result, userProfile) => {
         result ? done(null, userProfile) : done(null, false, { message: 'Incorrect username.' })
       })
     }, 1)
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
  req.isAuthenticated() ? next() : res.sendStatus(401)
}
// ==================================================================

api.use(passport.initialize()) // Add passport initialization
api.use(passport.session())    // Add passport session initialization

// ==================================================================
// route to log in
api.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user)
})

// route to test if the user is logged in or not
api.get('/loggedin', auth, (req, res) => {
  res.send(req.user)
})

// route to log out
api.post('/logout', auth, (req, res) => {
  req.logOut()
  res.sendStatus(200)
})

module.exports = api
