angular
    .module('mainComponentRoutes', [])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
            .state('landing', {
              templateUrl: '/components/templates/landing.html',
              controller: 'landingControl',
              url: '/start'
            })
    }])
