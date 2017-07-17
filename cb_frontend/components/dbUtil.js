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

/* ================================= User Management ================================= */

/**
 * Creates new user. Duh.
 * @param {object} user - User Object with name and passwd property
 * @param {function(string, object)} callback
 */
exports.createUser = (user, callback) => {
  bcrypt
    .hash(user.passwd, saltRounds)
    .then(hash => {
      pool.connect((err, client, done) => {
        if (err) console.error(err)
        client.query(`INSERT INTO users (name, passwd) VALUES ($1, $2)`,
          [user.name, hash], (err, result) => {
            done(err) // releases client back into pool
            callback(err, result)
          })
      })
    })
}

/**
* Checks if attempted login is valid
* @param {object} user - User Object with name and passwd property
* @param {function(string, boolean, object)} callback
*/
exports.login = (user, callback) => {
  pool.connect((err, client, done) => {
    if (err) {
      callback(err, null)
    } else {
      client.query(`SELECT * FROM users WHERE name=$1;`,
        [user.name], (err, result) => {
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
 * @param {function(string, object)} callback
 */
exports.deleteUser = (user, callback) => {
  pool.connect((err, client, done) => {
    if (err) console.error(err)
    client.query(`SELECT passwd FROM users WHERE name=$1;`,
    [user.name], (err, result) => {
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
              client.query(`DELETE FROM users WHERE name=$1`,
              [user.name], (err, result) => {
                done(err)
                callback(err, result)
              })
            }
          })
    })
  })
}

/* =================================================================================== */

/* ================================= Data Management ================================= */

/**
* Checks if attempted login is valid
* @param {string} userName - username for which the allocation is queried
* @param {function(string, object)} callback
*/
exports.getAllocation = (userName, callback) => {
  pool.connect((err, client, done) => {
    if (err) {
      callback(err, null)
    } else {
      client.query(`SELECT allocation FROM budget_allocation WHERE name=$1;`,
        [userName], (err, result) => {
          done(err)
          err ? callback(err, null) : callback(null, result.rows[0].allocation)
        })
    }
  })
}

/**
* get's spending history for user
* @param {string} userName - username for which the history is queried
* @param {integer} year - year for which the history is queried
* @param {function(string, object)} callback
*/
exports.getSpendingHistory = (userName, year, callback) => {
  pool.connect((err, client, done) => {
    if (err) {
      callback(err, null)
    } else {
      client.query(`SELECT data FROM spending_history WHERE name=$1 AND year=$2;`,
        [userName, year], (err, result) => {
          done(err)
          err ? callback(err, null) : callback(null, result.rows[0].data)
        })
    }
  })
}

/**
* get's spending habits for user
* @param {string} userName - username for which the habits is queried
* @param {integer} year - year for which the habits is queried
* @param {function(string, object)} callback
*/
exports.getSpendingHabits = (userName, year, callback) => {
  pool.connect((err, client, done) => {
    if (err) {
      callback(err, null)
    } else {
      client.query(`SELECT data FROM spending_habits WHERE name=$1 AND year=$2;`,
        [userName, year], (err, result) => {
          done(err)
          err ? callback(err, null) : callback(null, result.rows[0].data)
        })
    }
  })
}

/* =================================================================================== */

/**
 * Closes Postgres Pool connection
 */
exports.closeConnection = () => pool.end()
