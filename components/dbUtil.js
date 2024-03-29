'use strict'
const pg = require('pg')
const host = process.env.DB_HOST || '127.0.0.1' || 'ganymed.me'
const bcrypt = require('bcryptjs')
const smsUtil = require('./smsUtil')
const pool = new pg.Pool({
  user: 'root',
  password: 'passwd',
  host: host,
  port: 5432,
  database: 'cBanking'
})

const sendQuery = (query, values, callback) => {
  pool.connect((error, client, done) => {
    if (error) {
      callback(error, null)
    } else {
      client.query(query, values, (error, result) => {
        done(error) // releases client back into connection pool
        error ? callback(error, null) : callback(null, result)
      })
    }
  })
}

/* ================================= User Management ================================= */

/**
* Checks if attempted login is valid
* @param {object} user - User Object with name and passwd property
* @param {function(string, boolean, object)} callback
*/
exports.login = (user, callback) => {
  sendQuery('SELECT * FROM users WHERE name=$1;',
    [user.name], (error, result) => {
      if (!error) {
        const hash = (result && result.rows[0] && result.rows[0].passwd) ? result.rows[0].passwd : '$2a$10$'
        bcrypt.compare(user.passwd, hash, (error, res) => {
          if (res) {
            const userProfile = (result && result.rows[0] && result.rows[0].passwd) ? result.rows[0] : null
            callback(error, res, userProfile)
          } else {
            callback(error, null, null)
          }
        })
      } else {
        callback(error, null, null)
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
    [userName], (error, result) => {
      error ? callback(error, null) : callback(null, result.rows[0].allocation)
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
    [userName, year], (error, result) => {
      error ? callback(error, null) : callback(null, result.rows[0].data)
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
    [userName, year], (error, result) => {
      error ? callback(error, null) : callback(null, result.rows[0].data)
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
            WHERE konto=(SELECT konto FROM accounts WHERE name=$1)
            ORDER BY buchungstag DESC LIMIT $2;`,
    [userName, limit], (error, result) => {
      error ? callback(error, null) : callback(null, result.rows)
    })
}

/**
* insert transaction
* @param {object} transaction
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
            ], (error, result) => {
              if (!error) {
                switch (transaction.type) {
                  case 'Fraud':
                  case 'Special Interest':
                    smsUtil.send(`New ${transaction.type}`)
                    break
                  default:
                }
                callback(null, result.rows)
              } else {
                callback(error, null)
              }
            })
}

/**
* updatesTransaction
* @param {string} userName - username for which the transactions are queried
* @param {integer} limit - how many transactions will be queried
* @param {function(string, object)} callback
*/
exports.updateTransaction = (e2e_ref, type, callback) => {
  switch (type) { // prevent unkown types
    case 'Fraud':
    case 'Harmlos':
    case 'Special Interest':
      sendQuery(`UPDATE transactions
            SET type=$1
            WHERE e2e_ref=$2;`, [type, e2e_ref], (error, result) => {
              error ? callback(error, null) : callback(null, result.rows)
            })
      break
    default:
      callback('Wrong Type', null)
  }
}

/**
* get's transactions for user
* @param {string} userName - username for which the transactions are queried
* @param {integer} limit - how many transactions will be queried
* @param {function(string, object)} callback
*/
exports.getForecast = (userName, month, callback) => {
  sendQuery(`SELECT * FROM forecasts
            WHERE name=$1 AND month=$2`,
    [userName, month], (error, result) => {
      error ? callback(error, null) : callback(null, result.rows[0].data)
    })
}

/* =================================================================================== */

/**
 * Closes Postgres Pool connection
 */
exports.closeConnection = () => pool.end()
