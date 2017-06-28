angular
    .module('overviewCtrls', [])
    .controller('overviewCtrl', ($scope, $http) => {
      $scope.value = 1
      $scope.increment = () => {
        $scope.value++
      }
      $scope.decrement = () => {
        $scope.value--
      }
    })
