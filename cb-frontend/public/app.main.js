'use strict'
/* ======================== 3rd Party Modules ======================== */
// JavaScript
import 'angular'
import 'angular-animate'
import 'angular-aria'
import 'angular-loading-bar'
import 'angular-messages'
import 'angular-material'
import 'angular-ui-notification'
import 'angular-ui-router'
// CSS
import 'angular-material/angular-material.css'
import 'angular-ui-notification/dist/angular-ui-notification.min.css'
import 'angular-loading-bar/build/loading-bar.min.css'
/* =================================================================== */

/* ========================= Custom  Modules ========================= */
// JavaScript
import './components/routes.js'
import './components/mainComponent.ctrl.general.js'
import './components/login.ctrl.js'
import './components/navbar.ctrl.js'
import './components/account.ctrl.js'
import './components/register.ctrl.js'

// CSS
import './assets/css/main.css'
/* =================================================================== */

angular.module('cognitive-banking', [
  'ui.router', 'ngMaterial', 'ngAnimate', 'ui-notification', 'angular-loading-bar',
  'mainComponentCtrls', 'routes', 'loginCtrls', 'navbarCtrls', 'accountCtrls', 'registerCtrls'
]).config(function ($mdThemingProvider, $urlRouterProvider, $qProvider, $httpProvider, cfpLoadingBarProvider, NotificationProvider) {
  $mdThemingProvider.theme('default').primaryPalette('deep-purple')
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

  cfpLoadingBarProvider.includeSpinner = false

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
  .run(function ($state, $rootScope, $http, Notification) {
    // Logout function is available in any pages
    $rootScope.logout = function () {
      $http.post('/auth/logout')
      .success(function (user) {
        // No error: logout OK
        Notification.success({message: 'successfully logged out', delay: 5000 })
        $state.go('login')
      })
      .error(function () {
        // Error: logout failed
        Notification.error({message: 'logout failed <br> please try again', delay: 5000 })
      })
    }
  })
