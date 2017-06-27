'use strict'
const dbUtil = require('./dbUtil')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// ==================================================================
// Define the strategy to be used by PassportJS
passport.use(new LocalStrategy(
   (name, passwd, done) => {
     const userTmp = {name: name, passwd: passwd}
     dbUtil.login(userTmp, (err, result, userProfile) => {
       result ? done(null, userProfile) : done(null, false, { message: 'Incorrect username.' })
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
passport.auth = (req, res, next) => {
  req.isAuthenticated() ? next() : res.sendStatus(401)
}

module.exports = passport
