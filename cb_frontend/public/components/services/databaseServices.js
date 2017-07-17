angular
    .module('databaseServices', [])
    .service('historyService', historyService)
    .service('eventService', eventService)
    .service('allocationService', allocationService)

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
}

function eventService ($http) {
  this.log = msg => {
    $http({
      method: 'GET',
      url: '/auth/loggedin',
      ignoreLoadingBar: true
    }).then(response => {
      console.log(response)
    })
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
