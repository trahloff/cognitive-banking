'use strict'
const api = require('express').Router()

api.post('/notify', (req, res) => {
// insert bank notification API
  res.sendStatus(200)
})

module.exports = api
