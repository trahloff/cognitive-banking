'use strict'
const api = require('express').Router()
const dbUtil = require('../dbUtil')

const validator = (req, res, next) => {
  (req.body.name && req.body.passwd) ? next() : res.status(400).send('Bad Request')
}

api
    .use(validator)
    .post('/login', (req, res) => {
      dbUtil.login(req.body, (err, result) => {
        err ? res.status(500).send(err.detail) : res.status(200).send(result)
      })
    })
    .post('/createUser', (req, res) => {
      dbUtil.createUser(req.body, (err, result) => {
        err ? res.status(500).send(err.detail) : res.status(200).send('ok')
      })
    })
    .post('/ping', (req, res) => {
      res.send({pong: req.body})
    })

module.exports = api
