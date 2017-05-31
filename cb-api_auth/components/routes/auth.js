'use strict'
const api = require('express').Router()
const dbUtil = require('../dbUtil')

/**
 * Validates if incoming API Call is valid
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 * @param {function()} next - Executes normal Route logic
 */
const validator = (req, res, next) => {
  (req.body.name && req.body.passwd) ? next() : res.status(400).send('Bad Request')
}

api
    .use(validator)
    .post('/login', (req, res) => {
      dbUtil.login(req.body, (err, result) => {
        err ? res.status(500).send(err.detail) : res.status(200).send(result) // send HTTP500 if DB Transaction fails
      })
    })
    .post('/createUser', (req, res) => {
      dbUtil.createUser(req.body, (err, result) => {
        if (err) {
          if (err.detail.includes('already exists')) err.detail = `"${req.body.name}" already exists`
          res.status(500).send(err.detail)
        } else {
          res.status(200).send('ok')
        }
      })
    })

module.exports = api
