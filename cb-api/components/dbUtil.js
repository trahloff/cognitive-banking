'use strict'
const pg = require('pg')
const host = process.platform === 'win32' ? '127.0.0.1' : 'cb_db'
const pool = new pg.Pool({
  user: 'root',
  password: 'passwd',
  host: host,
  port: 5432,
  database: 'test'
})

exports.insert = (json, callback) => {
  pool.connect((err, client, done) => {
    if (err) console.error(err)
    client.query(`INSERT INTO public."temp" (json) VALUES ($1)`, [json], (err, result) => {
      done(err) // releases client back into pool
      callback(err, result)
    })
  })
}

exports.closeConnection = () => pool.end()
