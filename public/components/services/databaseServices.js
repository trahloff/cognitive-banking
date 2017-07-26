angular
    .module('databaseServices', [])
    .service('historyService', historyService)
    .service('allocationService', allocationService)
    .service('transactionService', transactionService)

const convertTimestamp = time => {
  return time.split('T')[0].split('-').reverse().toString().replace(/,/g, '.')
}

function historyService ($http) {
  this.getSpendingHistory = (name, year, cb) => {
    $http({
      method: 'GET',
      url: `/db/spendingHistory/${name}/${year}`
    }).then(
      response => {
        cb(response.data)
      },
      err => {
        console.log(err)
      }
    )
  }

  this.getSpendingHabits = (name, year, cb) => {
    $http({
      method: 'GET',
      url: `/db/spendingHabits/${name}/${year}`
    }).then(
      response => {
        cb(response.data)
      },
      err => {
        console.log(err)
      }
    )
  }

  this.getTransactions = (name, cb) => {
    $http({
      method: 'GET',
      url: `/db/transactions/${name}`
    }).then(
      response => {
        response.data.map(e => {
          e.buchungstag = convertTimestamp(e.buchungstag)
          e.wertstellungstag = convertTimestamp(e.wertstellungstag)
          e.betrag = e.betrag + '€'
          e.type = e.type === null ? 'N/A' : e.type
        })
        cb(response.data)
      },
      err => {
        console.log(err)
      }
    )
  }
}

function allocationService ($http) {
  this.getAllocation = (name, cb) => {
    $http({
      method: 'GET',
      url: `/db/budgetAllocation/${name}`
    }).then(
      response => {
        cb(response.data)
      },
      err => {
        console.log(err)
      }
    )
  }
}

function transactionService ($http) {
  this.updateTransaction = (e2e_ref, type, cb) => {
    $http({
      method: 'POST',
      url: `/db/transactions/${e2e_ref}`,
      data: { type: type }
    }).then(
      response => {
        cb(response.data)
      },
      err => {
        console.log(err)
      }
    )
  }
}
