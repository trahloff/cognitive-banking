'use strict'

angular
    .module('Angular-Skeleton', // tools HAVE to be loaded before the main components
  [
    // tools
    'ui.router', 'ngMaterial',
    // components
    'mainComponentCtrls', 'mainComponentRoutes'
  ])
  .config(['$mdThemingProvider', '$urlRouterProvider', '$qProvider', function ($mdThemingProvider, $urlRouterProvider, $qProvider) {
    $mdThemingProvider
          .theme('default')
          .primaryPalette('deep-orange')
          .accentPalette('light-blue')
    $urlRouterProvider.otherwise('/start') // if the user types some gibberish for an url he gets redirected to this page
  }])
