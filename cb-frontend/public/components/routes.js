angular
    .module('routes', [])
    .config(['$stateProvider', function ($stateProvider) {
      const checkLoggedin = function ($q, $http, $location) {
        // Initialize a new promise
        const deferred = $q.defer()

        // Make an AJAX call to check if the user is logged in
        $http({
          method: 'GET',
          url: '/auth/loggedin'
        }).then(successCallback = response => {
          if (response.data !== '0') {
            deferred.resolve()
          } else {
            $location.url('/login')
            deferred.reject()
          }
        }, errorCallback = response => {
          $location.url('/login')
          deferred.reject()
        })

        return deferred.promise
      }

      $stateProvider
            .state('landing', {
              templateUrl: '/components/templates/landing.html',
              controller: 'landingControl',
              url: '/start',
              resolve: { loggedin: checkLoggedin }
            })
            .state('login', {
              templateUrl: '/components/templates/login.html',
              url: '/login'
            })
    }])
