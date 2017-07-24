'use strict'
const api = require('express').Router()
const passport = require('../passportUtil')
const dbUtil = require('../dbUtil')
const socketUtil = require('../socketUtil')

api.get('/budgetAllocation/:name', passport.auth, (req, res) => {
  dbUtil.getAllocation(req.params.name, (err, result) => {
    err ? res.sendStatus(500) : res.send(result)
  })
})

api.get('/spendingHistory/:name/:year', passport.auth, (req, res) => {
  dbUtil.getSpendingHistory(req.params.name, req.params.year, (err, result) => {
    err ? res.sendStatus(500) : res.send(result)
  })
})

api.get('/spendingHabits/:name/:year', passport.auth, (req, res) => {
  dbUtil.getSpendingHabits(req.params.name, req.params.year, (err, result) => {
    err ? res.sendStatus(500) : res.send(result)
  })
})

api.get('/transactions/:name', passport.auth, (req, res) => {
  dbUtil.getTransactions(req.params.name, 50, (err, result) => {
    err ? res.sendStatus(500) : res.send(result)
  })
})

api.post('/transactions', (req, res) => {
  // dbUtil.insertTransaction(req.body, (err, result) => {
  //   if (err) {
  //     res.status(400).send(err)
  //   } else {
  //     res.send(result)
  res.sendStatus(200)
  socketUtil.sendNewTransaction(req.body)
  //   }
  // })
})

module.exports = api
