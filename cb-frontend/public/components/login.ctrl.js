'use strict'
angular
    .module('loginCtrls', ['ngMaterial', 'ngMessages'])
    .controller('loginCtrl', function ($scope, $http, $state, $rootScope, Notification) {
      $scope.login = function (user) {
        $http.post('/auth/login', {
          username: user.username,
          password: user.password
        })
        .success(function (user) {
          // No error: authentication OK
          $rootScope.userProfile = user
          Notification.success('successfully logged in')
          $state.go('main.overview')
        })
        .error(function () {
          // Error: authentication failed
          Notification.error({message: 'authentication failed', delay: 5000 })
          $state.go('login')
        })
      }
    })
