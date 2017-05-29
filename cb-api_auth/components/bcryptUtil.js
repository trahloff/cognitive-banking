'use strict'
const bcrypt = require('bcrypt')
const saltRounds = 10

exports.hashPasswd = (passwd, cb) => {
  bcrypt.hash(passwd, saltRounds).then(hash => {
    cb(hash)
  })
}

exports.comparePasswd = (passwdAttemptPlain, passwdHash, cb) => {
  bcrypt.compare(passwdAttemptPlain, passwdHash).then(result => {
    cb(result)
  })
}
