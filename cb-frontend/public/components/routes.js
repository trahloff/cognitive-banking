angular
    .module('routes', [])
    .config(['$stateProvider', function ($stateProvider) {
      const loggedIn = function ($q, $http, $state, $rootScope, Notification) {
        // Initialize a new promise
        const deferred = $q.defer()

        const successCallback = response => deferred.resolve()

        const errorCallback = response => {
          $state.go('login')
          Notification.error({message: 'not logged in', delay: 5000 })
          deferred.reject() // rejects promise, prevent client from loading new view
        }

        $http({
          method: 'HEAD',
          url: '/auth/loggedin',
          ignoreLoadingBar: true
        }).then(successCallback, errorCallback)

        return deferred.promise
      }

      $stateProvider
            .state('login', {
              templateUrl: '/components/templates/login.html',
              controller: 'loginCtrl',
              url: '/login'
            })
            .state('main', {
              abstract: true,
              templateUrl: '/components/templates/navbar.html',
              controller: 'navbarCtrl',
              url: '/'
            })
            .state('main.overview', {
              templateUrl: '/components/templates/overview.html',
              controller: 'landingControl',
              url: 'overview',
              resolve: {check: loggedIn}
            })
            .state('main.account', {
              templateUrl: '/components/templates/account.html',
              controller: 'accountCtrl',
              url: 'account',
              resolve: {check: loggedIn}
            })
    }])
