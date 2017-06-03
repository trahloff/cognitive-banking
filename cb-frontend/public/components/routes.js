angular
    .module('routes', [])
    .config(['$stateProvider', function ($stateProvider) {
      const checkLoggedin = function ($q, $http, $state, Notification) {
        // Initialize a new promise
        const deferred = $q.defer()

        // Make an AJAX call to check if the user is logged in
        $http({
          method: 'GET',
          url: '/auth/loggedin'
        }).then(successCallback = response => {
          if (response.data !== '0') {
            deferred.resolve() // resolves promise, allowes client to load new view
          } else {
            $state.go('login')
            Notification.error({message: 'not logged in', delay: 5000 })
            deferred.reject() // rejects promise, prevent client from loading new view
          }
        }, errorCallback = response => {
          $state.go('login')
          Notification.error('server problem')
          deferred.reject()
        })

        return deferred.promise
      }

      $stateProvider
            .state('start', {
              templateUrl: '/components/templates/landing.html',
              controller: 'landingControl',
              url: '/start',
              resolve: { loggedin: checkLoggedin }
            })
            .state('login', {
              templateUrl: '/components/templates/login.html',
              controller: 'loginCtrl',
              url: '/login'
            })
    }])
