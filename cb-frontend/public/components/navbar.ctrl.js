angular
    .module('navbarCtrls', ['ngMaterial'])
    .controller('navbarCtrl', function ($scope, $timeout, $mdSidenav, $rootScope) {
        // closes the sidenav
      $scope.close = function () {
        $mdSidenav('left').close()
      }

      $scope.mainTitle = 'CarConnect'

      $scope.toggleMenu = buildDelayedToggler('left')

        // needed for fancy sideNavBar animation
      function debounce (func, wait, context) {
        var timer
        return function debounced () {
          var context = $scope,
            args = Array.prototype.slice.call(arguments)
          $timeout.cancel(timer)
          timer = $timeout(function () {
            timer = undefined
            func.apply(context, args)
          }, wait || 10)
        }
      };

        // toggles the sideNavBar
      function buildDelayedToggler (navID) {
        return debounce(function () {
          $mdSidenav(navID)
                    .toggle()
                    .then(function () {})
        }, 200)
      };
    }
    )
