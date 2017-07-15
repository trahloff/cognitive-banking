angular
    .module('databaseServices', [])
    .service('historyService', historyService)
    .service('eventService', eventService)
    .service('allocationService', allocationService)

function historyService ($http) {
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
