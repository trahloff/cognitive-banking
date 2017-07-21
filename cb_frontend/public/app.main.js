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
import 'angular-socket-io'
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
import './components/transactions.ctrl.js'
import './components/services/databaseServices.js'

// CSS
import './assets/css/main.css'
/* =================================================================== */

angular.module('cognitive-banking', [
  'ui.router', 'ngMaterial', 'ngAnimate', 'ui-notification', 'angular-loading-bar', 'chart.js', 'md.data.table', 'btford.socket-io',
  'databaseServices',
  'overviewCtrls', 'routes', 'loginCtrls', 'navbarCtrls', 'accountCtrls', 'registerCtrls', 'rulesCtrls', 'transactionCtrls'
]).config(($mdThemingProvider, $urlRouterProvider, $qProvider, $httpProvider, cfpLoadingBarProvider, NotificationProvider, ChartJsProvider) => {
  $mdThemingProvider.theme('default').primaryPalette('red')

  // if the user types some gibberish for an url he gets redirected to this page
  $urlRouterProvider.otherwise('/login')

  // default settings for pop-up notifications
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

  /*
   * don't show loading spinner
   * don't show loading bar if HTTP request < 200ms
   */
  cfpLoadingBarProvider.includeSpinner = false
  cfpLoadingBarProvider.latencyThreshold = 200

  // intercept any HTTP requests and prevent logic execution if unauthorized
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
    // Logout function is available in any page
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
        // split state parent name
        const stateNameArray = toState.name.split('.')
        const nestedName = stateNameArray[stateNameArray.length - 1]
        /*
         * get the current state name, capitalize the first letter and write the result into rootScope
         * needed for title in menu bar
         */
        $rootScope.stateName = nestedName.replace(/\b\w/g, l => l.toUpperCase())
      })
  })

  .factory('socket', socketFactory => {
    const socket = socketFactory()
    socket.on('newTransaction', (message) => console.log(message))
    return socket
  })
