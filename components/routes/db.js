'use strict'
const api = require('express').Router()
const passport = require('../passportUtil')
const dbUtil = require('../dbUtil')
const socketUtil = require('../socketUtil')

api.get('/budgetAllocation/:name', passport.auth, (req, res) => {
  dbUtil.getAllocation(req.params.name, (error, result) => {
    error ? res.status(500).send(error) : res.send(result)
  })
})

api.get('/spendingHistory/:name/:year', passport.auth, (req, res) => {
  dbUtil.getSpendingHistory(req.params.name, req.params.year, (error, result) => {
    error ? res.status(500).send(error) : res.send(result)
  })
})

api.get('/spendingHabits/:name/:year', passport.auth, (req, res) => {
  dbUtil.getSpendingHabits(req.params.name, req.params.year, (error, result) => {
    error ? res.status(500).send(error) : res.send(result)
  })
})

api.get('/transactions/:name', passport.auth, (req, res) => {
  dbUtil.getTransactions(req.params.name, 50, (error, result) => {
    error ? res.status(500).send(error) : res.send(result)
  })
})

api.post('/transactions', (req, res) => {
  if (!req.body.nonPersist) {
    dbUtil.insertTransaction(req.body, (error, result) => {
      if (error) {
        res.status(400).send(error)
      } else {
        res.sendStatus(200)
        socketUtil.sendNewTransaction(req.body)
      }
    })
  } else {
    res.sendStatus(200)
    socketUtil.sendNewTransaction(req.body)
  }
})

api.post('/transactions/:e2e_ref', (req, res) => {
  dbUtil.updateTransaction(req.params.e2e_ref, req.body.type, (error, result) => {
    error ? res.status(500).send(error) : res.send(result)
  })
})

api.get('/forecast/:name/:month', passport.auth, (req, res) => {
  dbUtil.getForecast(req.params.name, req.params.month, (error, result) => {
    error ? res.status(500).send(error) : res.send(result)
  })
})

module.exports = api
