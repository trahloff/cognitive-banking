'use strict'
const pg = require('pg')
const host = process.env.DB_HOST || '127.0.0.1' || 'ganymed.me'
const bcrypt = require('bcrypt')
const saltRounds = 10
const pool = new pg.Pool({
  user: 'root',
  password: 'passwd',
  host: host,
  port: 5431,
  database: 'cBanking'
})

const sendQuery = (query, values, callback) => {
  pool.connect((err, client, done) => {
    if (err) {
      callback(err, null)
    } else {
      client.query(query, values, (err, result) => {
        done(err) // releases client back into connection pool
        err ? callback(err, null) : callback(null, result)
      })
    }
  })
}

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
      sendQuery('INSERT INTO users (name, passwd) VALUES ($1, $2)',
        [user.name, hash], (err, result) => {
          callback(err, result)
        })
    })
}

/**
* Checks if attempted login is valid
* @param {object} user - User Object with name and passwd property
* @param {function(string, boolean, object)} callback
*/
exports.login = (user, callback) => {
  sendQuery('SELECT * FROM users WHERE name=$1;',
    [user.name], (err, result) => {
      const hash = (result && result.rows[0] && result.rows[0].passwd) ? result.rows[0].passwd : '$2a$10$'
      bcrypt
        .compare(user.passwd, hash)
        .then(authenticated => {
          const userProfile = (result && result.rows[0] && result.rows[0].passwd) ? result.rows[0] : null
          callback(err, authenticated, userProfile)
        })
    })
}

/**
 * Deletes User
 * @param {object} user - User Object with name and passwd property
 * @param {function(string, object)} callback
 */
exports.deleteUser = (user, callback) => {
  sendQuery('SELECT passwd FROM users WHERE name=$1;',
  [user.name], (err, result) => {
    if (err) {
      callback(err, null)
    } else {
      // when a valid user is entered, the passwd attempt and stored passwd hash will be compared
      // if not, the passwd will be compared with an empty hash in order to mitigate side-channel attacks (i.e., timing)
      const hash = (result && result.rows[0] && result.rows[0].passwd) ? result.rows[0].passwd : '$2a$10$'
      bcrypt
          .compare(user.passwd, hash)
          .then(result => {
            if (!result) {
              callback('wrong credentials', null)
            } else {
              sendQuery('DELETE FROM users WHERE name=$1',
              [user.name], (err, result) => {
                callback(err, result)
              })
            }
          })
    }
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
  sendQuery('SELECT allocation FROM budget_allocation WHERE name=$1;',
    [userName], (err, result) => {
      err ? callback(err, null) : callback(null, result.rows[0].allocation)
    })
}

/**
* get's spending history for user
* @param {string} userName - username for which the history is queried
* @param {integer} year - year for which the history is queried
* @param {function(string, object)} callback
*/
exports.getSpendingHistory = (userName, year, callback) => {
  sendQuery('SELECT data FROM spending_history WHERE name=$1 AND year=$2;',
    [userName, year], (err, result) => {
      err ? callback(err, null) : callback(null, result.rows[0].data)
    })
}

/**
* get's spending habits for user
* @param {string} userName - username for which the habits is queried
* @param {integer} year - year for which the habits is queried
* @param {function(string, object)} callback
*/
exports.getSpendingHabits = (userName, year, callback) => {
  sendQuery('SELECT data FROM spending_habits WHERE name=$1 AND year=$2;',
    [userName, year], (err, result) => {
      err ? callback(err, null) : callback(null, result.rows[0].data)
    })
}

/**
* get's transactions for user
* @param {string} userName - username for which the transactions are queried
* @param {integer} limit - how many transactions will be queried
* @param {function(string, object)} callback
*/
exports.getTransactions = (userName, limit, callback) => {
  sendQuery(`SELECT * FROM transactions
            WHERE konto=(SELECT konto FROM konten WHERE name=$1)
            ORDER BY buchungstag DESC LIMIT $2;`,
    [userName, limit], (err, result) => {
      err ? callback(err, null) : callback(null, result.rows)
    })
}

/**
* get's transactions for user
* @param {string} userName - username for which the transactions are queried
* @param {integer} limit - how many transactions will be queried
* @param {function(string, object)} callback
*/
exports.insertTransaction = (transaction, callback) => {
  sendQuery(`INSERT INTO transactions(
            e2e_ref, konto, betrag, beleg, buchungstag, wertstellungstag,
            empfaenger_or_zahlungspflichtiger, transaktion_art, umsatzdetails_or_verwendungszweck,
            verwendungsschluessel, glaeubiger_id, mandatsreferenz, type)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13);`, [
              transaction.e2e_ref,
              transaction.konto,
              transaction.betrag,
              transaction.beleg,
              transaction.buchungstag,
              transaction.wertstellungstag,
              transaction.empfaenger_or_zahlungspflichtiger,
              transaction.transaktion_art,
              transaction.umsatzdetails_or_verwendungszweck,
              transaction.verwendungsschluessel,
              transaction.glaeubiger_id,
              transaction.mandatsreferenz,
              transaction.type
            ], (err, result) => {
              err ? callback(err, null) : callback(null, result.rows)
            })
}

/* =================================================================================== */

/**
 * Closes Postgres Pool connection
 */
exports.closeConnection = () => pool.end()
