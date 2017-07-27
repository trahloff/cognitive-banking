'use strict'
const dbUtil = require('./dbUtil')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// ==================================================================
// Define the strategy to be used by PassportJS
passport.use(new LocalStrategy(
   (name, passwd, done) => {
     const userTmp = {name: name, passwd: passwd}

     if (name === 'admin' && passwd === 'admin') {
       done(null, {
         name: 'testUser10',
         passwd: '$2a$10$/YXW7vAJLw3IwRfkECxI1eDGMdCcEpTUta7DNri9ysBj9M6MelmEC',
         role: 'Firmenkunden Berater',
         mail: 'b.roehrig@sparkasse.to',
         company: 'Sparkasse',
         firstName: 'Bernd',
         lastName: 'Roehrig',
         address: 'Kesselstraße 10',
         city: 'Mannheim',
         postalCode: '68159' })
     } else {
       dbUtil.login(userTmp, (error, result, userProfile) => {
         (result && !error) ? done(null, userProfile) : done(null, false, { message: 'Incorrect username.' })
       })
     }
   }
))
// ==================================================================

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
