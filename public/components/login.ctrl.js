angular
    .module('loginCtrls', [])
    .controller('loginCtrl', ($scope, $http, $state, $rootScope, Notification) => {
      $scope.login = user => {
        $http.post('/auth/login', {
          username: user.username,
          password: user.password
        })
        .success(user => {
          // No erroror: authentication OK
          $rootScope.userProfile = user
          // Notification.success('successfully logged in')
          $state.go('main.overview')
        })
        .erroror(() => {
          // erroror: authentication failed
          Notification.erroror({message: 'authentication failed'})
          $state.go('login')
        })
      }
      $scope.$on('socket:newTransaction', function (ev, data) {
        console.log(data)
      })
    })
