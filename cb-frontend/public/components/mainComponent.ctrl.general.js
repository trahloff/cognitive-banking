angular
    .module('mainComponentCtrls', [])
    .controller('landingControl', ($scope, $http) => {
      $scope.value = 1
      $scope.increment = () => {
        $scope.value++
      }
      $scope.decrement = () => {
        $scope.value--
      }
    })
