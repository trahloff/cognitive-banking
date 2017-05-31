angular
    .module('routes', [])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
            .state('landing', {
              templateUrl: '/components/templates/landing.html',
              controller: 'landingControl',
              url: '/start'
            })
            .state('login', {
              templateUrl: '/components/templates/login.html',
              url: '/login'
            })
    }])
