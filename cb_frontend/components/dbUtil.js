'use strict'
const pg = require('pg')
const host = process.platform === 'win32' ? '127.0.0.1' : 'homeserver'
const bcrypt = require('bcrypt')
const saltRounds = 10
const pool = new pg.Pool({
  user: 'root',
  password: 'passwd',
  host: host,
  port: 5432,
  database: 'users'
})

/**
 * Creates new user. Duh.
 * @param {object} user - User Object with name and passwd property
 * @param {function(string, boolean)} callback
 */
exports.createUser = (user, callback) => {
  bcrypt
    .hash(user.passwd, saltRounds)
    .then(hash => {
      pool.connect((err, client, done) => {
        if (err) console.error(err)
        client.query(`INSERT INTO public."logins" (name, passwd) VALUES ($1, $2)`, [user.name, hash], (err, result) => {
          done(err) // releases client back into pool
          callback(err, result)
        })
      })
    })
}

/**
* Checks if attempted login is valid
* @param {object} user - User Object with name and passwd property
* @param {function(string, boolean)} callback
*/
exports.login = (user, callback) => {
  pool.connect((err, client, done) => {
    if (err) {
      callback(err, null)
    } else {
      client.query(`SELECT * FROM public."logins" WHERE name=$1;`, [user.name], (err, result) => {
        done(err)
        const hash = (result && result.rows[0] && result.rows[0].passwd) ? result.rows[0].passwd : '$2a$10$'
        bcrypt
        .compare(user.passwd, hash)
        .then(authenticated => {
          const userProfile = (result && result.rows[0] && result.rows[0].passwd) ? result.rows[0] : null
          callback(err, authenticated, userProfile)
        })
      })
    }
  })
}

/**
 * Deletes User
 * @param {object} user - User Object with name and passwd property
 * @param {function(string, boolean)} callback
 */
exports.deleteUser = (user, callback) => {
  pool.connect((err, client, done) => {
    if (err) console.error(err)
    client.query(`SELECT passwd FROM public."logins" WHERE name=$1;`, [user.name], (err, result) => {
      // when a valid user is entered, the passwd attempt and stored passwd hash will be compared
      // if not, the passwd will be compared with an empty hash in order to mitigate side-channel attacks (i.e., timing)
      const hash = (result && result.rows[0] && result.rows[0].passwd) ? result.rows[0].passwd : '$2a$10$'
      bcrypt
          .compare(user.passwd, hash)
          .then(result => {
            if (!result) {
              done(err)
              callback('wrong credentials', null)
            } else {
              client.query(`DELETE FROM public."logins" WHERE name=$1`, [user.name], (err, result) => {
                done(err)
                callback(err, result)
              })
            }
          })
    })
  })
}

/**
 * Closes Postgres Pool connection
 */
exports.closeConnection = () => pool.end()
