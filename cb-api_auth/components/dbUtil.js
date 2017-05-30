'use strict'
const pg = require('pg')
const host = process.platform === 'win32' ? '127.0.0.1' : 'cb-db'
const bcryptUtil = require('./bcryptUtil')
const pool = new pg.Pool({
  user: 'root',
  password: 'passwd',
  host: host,
  port: 5432,
  database: 'users'
})

exports.createUser = (user, callback) => {
  bcryptUtil.hashPasswd(user.passwd, hash => {
    pool.connect((err, client, done) => {
      if (err) console.error(err)
      client.query(`INSERT INTO public."logins" (name, passwd) VALUES ($1, $2)`, [user.name, hash], (err, result) => {
        done(err) // releases client back into pool
        callback(err, result)
      })
    })
  })
}

exports.login = (user, callback) => {
  pool.connect((err, client, done) => {
    if (err) console.error(err)
    client.query(`SELECT passwd FROM public."logins" WHERE name=$1;`, [user.name], (err, result) => {
      done(err)
      if (result && result.rows[0] && result.rows[0].passwd) { // valid user exists
        bcryptUtil.comparePasswd(user.passwd, result.rows[0].passwd, authorized => {
          callback(err, authorized)
        })
      } else { // user does not exist. compare passwd attempt with hash and send "unauthorized" in order to prevent side-channel-attacks (i.e., timing)
        bcryptUtil.comparePasswd(user.passwd, '$2a$10$000', authorized => { // invalid hash
          callback(err, false)
        })
      }
    })
  })
}

exports.closeConnection = () => pool.end()