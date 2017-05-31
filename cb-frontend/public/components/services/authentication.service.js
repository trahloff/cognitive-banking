(function () {
  'use strict'

  angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService)

  AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'base64Service']
  function AuthenticationService ($http, $cookies, $rootScope, $timeout, base64Service) {
    var service = {}

    service.Login = Login
    service.SetCredentials = SetCredentials
    service.ClearCredentials = ClearCredentials

    return service

    function Login (username, password, callback) {
      $http.post('/auth/login', { name: username, passwd: password })
               .success(function (response) {
                 callback(response)
               })
    }

    function SetCredentials (username, password) {
      var authdata = Base64.encode(username + ':' + password)

      $rootScope.globals = {
        currentUser: {
          username: username,
          authdata: authdata
        }
      }

            // set default auth header for http requests
      $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata

            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
      var cookieExp = new Date()
      cookieExp.setDate(cookieExp.getDate() + 7)
      $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp })
    }

    function ClearCredentials () {
      $rootScope.globals = {}
      $cookies.remove('globals')
      $http.defaults.headers.common.Authorization = 'Basic'
    }
  }
})()
