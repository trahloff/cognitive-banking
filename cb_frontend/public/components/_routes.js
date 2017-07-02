angular
    .module('routes', [])
    .config(['$stateProvider', $stateProvider => {
      const loggedIn = ($q, $http, $state, $rootScope, Notification) => {
        // Initialize a new promise
        const deferred = $q.defer()

        const successCallback = response => {
          $rootScope.userProfile = response.data
          deferred.resolve()
        }

        const errorCallback = response => {
          $state.go('login')
          Notification.error({message: 'not logged in'})
          deferred.reject() // rejects promise, prevent client from loading new view
        }

        /**
         * query the backend on every state-change if the current session is authorized
         * an authorized session will get a HTTP200 response, leading to successCallback
         * an unauthorized session will get a HTTP401 response, leading to errorCallback 
         */
        $http({
          method: 'GET',
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
              controller: 'overviewCtrl',
              url: 'overview',
              resolve: {check: loggedIn}
            })
            .state('main.account', {
              templateUrl: '/components/templates/account.html',
              controller: 'accountCtrl',
              url: 'account',
              resolve: {check: loggedIn}
            })
            .state('main.rules', {
              templateUrl: '/components/templates/rules.html',
              controller: 'rulesCtrl',
              url: 'rules',
              resolve: {check: loggedIn}
            })
    }])
