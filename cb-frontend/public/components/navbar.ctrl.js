angular
    .module('navbarCtrls', [])
    .controller('navbarCtrl', ($scope, $timeout, $mdSidenav, $rootScope) => {
      // needed for fancy sideNavBar animation
      const debounce = (func, wait, context) => {
        let timer
        return () => {
          let context = $scope,
            args = Array.prototype.slice.call(arguments)
          $timeout.cancel(timer)
          timer = $timeout(() => {
            timer = undefined
            func.apply(context, args)
          }, wait || 10)
        }
      }

      // toggles the sideNavBar
      const buildDelayedToggler = navID => {
        return debounce(() => {
          $mdSidenav(navID)
          .toggle()
          .then(() => {})
        }, 200)
      }

        // closes the sidenav
      $scope.close = () => {
        $mdSidenav('left').close()
      }

      $scope.mainTitle = 'CarConnect'

      $scope.toggleMenu = buildDelayedToggler('left')
    })
