'use strict'
const api = require('express').Router()
const passport = require('../passportUtil')
const dbUtil = require('../dbUtil')

// route to test if the user is logged in or not
api.get('/budgetAllocation/:name', passport.auth, (req, res) => {
  dbUtil.getAllocation(req.params.name, (err, result) => {
    err ? res.status(500) : res.send(result)
  })
})

module.exports = api
