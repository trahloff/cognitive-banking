'use strict'
const api = require('express').Router()
const dbUtil = require('../dbUtil')

api
    .post('/insert', (req, res) => {
      dbUtil.insert(req.body.id, (err, result) => {
        res.send({
          result: result,
          error: err
        })
      })
    })
    .post('/ping', (req, res) => {
      res.send({pong: req.body})
    })

module.exports = api
