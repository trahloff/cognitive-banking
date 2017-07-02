/* ======================== 3rd Party Modules ======================== */
// JavaScript
import 'angular'
import 'angular-animate'
import 'angular-aria'
import 'angular-chart.js'
import 'angular-loading-bar'
import 'angular-material'
import 'angular-material-data-table/dist/md-data-table.min.js'
import 'angular-messages'
import 'angular-ui-notification'
import 'angular-ui-router'

// CSS
import 'angular-material/angular-material.css'
import 'angular-ui-notification/dist/angular-ui-notification.min.css'
import 'angular-material-data-table/dist/md-data-table.min.css'
import 'angular-loading-bar/build/loading-bar.min.css'
/* =================================================================== */

/* ========================= Custom  Modules ========================= */
// JavaScript
import './components/_routes.js'
import './components/overview.ctrl.js'
import './components/login.ctrl.js'
import './components/navbar.ctrl.js'
import './components/account.ctrl.js'
import './components/register.ctrl.js'
import './components/rules.ctrl.js'

// CSS
import './assets/css/main.css'
/* =================================================================== */

angular.module('cognitive-banking', [
  'ui.router', 'ngMaterial', 'ngAnimate', 'ui-notification', 'angular-loading-bar', 'chart.js', 'md.data.table',
  'overviewCtrls', 'routes', 'loginCtrls', 'navbarCtrls', 'accountCtrls', 'registerCtrls', 'rulesCtrls'
]).config(($mdThemingProvider, $urlRouterProvider, $qProvider, $httpProvider, cfpLoadingBarProvider, NotificationProvider, ChartJsProvider) => {
  $mdThemingProvider.theme('default').primaryPalette('red')

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

  // Configure all charts
  ChartJsProvider.setOptions({
    chartColors: ['#FFCC80', '#FF9800', '#EF6C00'],
    responsive: true,
    animation: {
      duration: 1500
    },
    legend: {
      display: true,
      position: 'bottom',
      fullWidth: true
    }
  })

  cfpLoadingBarProvider.includeSpinner = false
  cfpLoadingBarProvider.latencyThreshold = 200

  $httpProvider.interceptors.push(($q, $location) => {
    return {
      response: response => {
        return response
      },
      responseError: response => {
        if (response.status === 401) {
          $location.url('/login')
        }
        return $q.reject(response)
      }
    }
  })
})
  .run(($state, $rootScope, $http, Notification) => {
    // Logout function is available in any pages
    $rootScope.logout = () => {
      $http.post('/auth/logout')
      .success(user => {
        // No error: logout OK
        Notification.success({message: 'successfully logged out', delay: 5000 })
        $state.go('login')
      })
      .error(() => {
        // Error: logout failed
        Notification.error({message: 'logout failed <br> please try again', delay: 5000 })
      })
    }

    $rootScope.$on('$stateChangeSuccess',
      (event, toState, toParams, fromState, fromParams) => {
        const stateNameArray = toState.name.split('.')
        const nestedName = stateNameArray[stateNameArray.length - 1]
        $rootScope.stateName = nestedName.replace(/\b\w/g, l => l.toUpperCase())
      })
  })