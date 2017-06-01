angular
    .module('routes', [])
    .config(['$stateProvider', function ($stateProvider) {
      const checkLoggedin = function ($q) {
        // Initialize a new promise
        const deferred = $q.defer()
        // Make an AJAX call to check if the user is logged in
        $http.get('/loggedin').success(function (user) {
          // Authenticated
          if (user !=== '0') {
            deferred.resolve()
          } else {
            deferred.reject()
            $location.url('/start')
          }
        })
        return deferred.promise
      }

      $stateProvider
            .state('landing', {
              templateUrl: '/components/templates/landing.html',
              controller: 'landingControl',
              url: '/start'
            })
            .state('login', {
              templateUrl: '/components/templates/login.html',
              url: '/login',
              resolve: { loggedin: checkLoggedin }
            })
    }])
