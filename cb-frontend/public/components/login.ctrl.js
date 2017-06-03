'use strict'
angular
    .module('loginCtrls', ['ngMaterial', 'ngMessages'])
    .controller('loginCtrl', function ($scope, $http, $state, Notification) {
      $scope.login = function (user) {
        $http.post('/auth/login', {
          username: user.username,
          password: user.password
        })
        .success(function (user) {
          // No error: authentication OK
          Notification.success('successfully logged in')
          $state.go('start')
        })
        .error(function () {
          // Error: authentication failed
          Notification.error({message: 'authentication failed', delay: 5000 })
          $state.go('login')
        })
      }
    })
