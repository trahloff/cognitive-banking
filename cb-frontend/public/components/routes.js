angular
    .module('routes', [])
    .config(['$stateProvider', function ($stateProvider) {
      const checkLoggedin = function ($q, $http, $location, Notification) {
        // Initialize a new promise
        const deferred = $q.defer()

        // Make an AJAX call to check if the user is logged in
        $http({
          method: 'GET',
          url: '/auth/loggedin'
        }).then(successCallback = response => {
          if (response.data !== '0') {
            Notification.success('successfully logged in')
            deferred.resolve() // resolves promise, allowes client to load new view
          } else {
            $location.url('/login')
            Notification.error({message: 'not logged in', delay: 5000 })
            $route.reload() // needs to be called in order to function with refresh of restricted view w/o loggedin user
            deferred.reject() // rejects promise, prevent client from loading new view
          }
        }, errorCallback = response => {
          $location.url('/login')
          Notification.error('server problem')
          $route.reload()
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
              controller: 'loginCtrl',
              url: '/login'
            })
    }])
