'use strict'
angular
    .module('loginCtrls', ['ngMaterial', 'ngMessages'])
    .controller('loginCtrl', ($scope, $http, $state, $rootScope, Notification) => {
      $scope.login = user => {
        $http.post('/auth/login', {
          username: user.username,
          password: user.password
        })
        .success(user => {
          // No error: authentication OK
          $rootScope.userProfile = user
          Notification.success('successfully logged in')
          $state.go('main.overview')
        })
        .error(() => {
          // Error: authentication failed
          Notification.error({message: 'authentication failed', delay: 5000 })
          $state.go('login')
        })
      }
    })
