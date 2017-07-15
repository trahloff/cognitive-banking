'use strict'
const api = require('express').Router()

/**
 * Validates if incoming API Call is valid
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 * @param {function()} next - Executes normal Route logic
 */
const validator = (req, res, next) => {
  next()
}

api
    .use(validator)
    .get('/:userId', (req, res) => {
      console.log(req.params.userId)
      res.status(200).send('ok')
    })
    .put('/:userId', (req, res) => {
      console.log(req.params.userId)
      res.status(200).send('ok')
    })
    .delete('/:userId', (req, res) => {
      console.log(req.params.userId)
      res.status(200).send('ok')
    })

module.exports = api
