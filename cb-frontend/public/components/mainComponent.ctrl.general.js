'use strict'
angular
    .module('mainComponentCtrls', ['ngMaterial', 'ngMessages'])
    .controller('landingControl', ($scope, $http) => {
      $scope.value = 1
      $scope.increment = () => {
        $scope.value++
      }
      $scope.decrement = () => {
        $scope.value--
      }
      $scope.pingBackend = () => {
        $http({
          method: 'GET',
          url: '/default/hello'
        }).then(function successCallback (response) {
          alert(response.data)
        }, function errorCallback (response) {
          alert(response.data)
        })
      }
    })
