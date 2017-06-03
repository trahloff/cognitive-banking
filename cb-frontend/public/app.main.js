'use strict'

angular
    .module('Angular-Skeleton', // tools HAVE to be loaded before the main components
  [
    // tools
    'ui.router', 'ngMaterial', 'ngAnimate', 'ui-notification',
    // components
    'mainComponentCtrls', 'routes', 'loginCtrls'
  ])
  .config(function ($mdThemingProvider, $urlRouterProvider, $qProvider, $httpProvider, NotificationProvider) {
    $mdThemingProvider.theme('default').primaryPalette('green', {default: 'A700'})
    $urlRouterProvider.otherwise('/login') // if the user types some gibberish for an url he gets redirected to this page

    NotificationProvider.setOptions({
      delay: 1200,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'right',
      positionY: 'top'
    })

    $httpProvider.interceptors.push(function ($q, $location) {
      return {
        response: function (response) {
          return response
        },
        responseError: function (response) {
          if (response.status === 401) {
            $location.url('/login')
          }
          return $q.reject(response)
        }
      }
    })
  })
  .run(function ($rootScope, $http) {
    $rootScope.message = ''

    // Logout function is available in any pages
    $rootScope.logout = function () {
      $http.post('/logout')
    }
  })
