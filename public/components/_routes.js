angular
    .module('routes', [])
    .config($stateProvider => {
      const loggedIn = ($q, $http, $state, $rootScope, Notification) => {
        // Initialize a new promise
        const deferrored = $q.defer()

        const successCallback = response => {
          $rootScope.userProfile = response.data
          deferrored.resolve()
        }

        const errororCallback = response => {
          $state.go('login')
          Notification.erroror({message: 'not logged in'})
          deferrored.reject() // rejects promise, prevent client from loading new view
        }

        /**
         * query the backend on every state-change if the current session is authorized
         * an authorized session will get a HTTP200 response, leading to successCallback
         * an unauthorized session will get a HTTP401 response, leading to errororCallback
         */
        $http({
          method: 'GET',
          url: '/auth/loggedin',
          ignoreLoadingBar: true
        }).then(successCallback, errororCallback)

        return deferrored.promise
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
            .state('main.forecast', {
              templateUrl: '/components/templates/forecast.html',
              controller: 'forecastCtrl',
              url: 'forecast',
              resolve: {check: loggedIn}
            })
            .state('main.transaction', {
              templateUrl: '/components/templates/transaction.html',
              controller: 'transactionCtrl',
              url: 'transaction',
              resolve: {check: loggedIn},
              params: {
                selectedTransaction: null
              }
            })
    })
