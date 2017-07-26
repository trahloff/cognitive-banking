angular
    .module('forecastCtrls', [])
    .controller('forecastCtrl', ($scope, $http) => {
      $scope.month = 'August'
      $scope.forecast = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        series: ['Kontostand'],
        data: []
      }

      ;(function () {
        $http({
          method: 'GET',
          url: `/db/forecast/mschidt/${$scope.month}`
        }).then(
              response => {
                $scope.forecast.data.push(response.data.data)
              },
              err => alert(err)
            )
      }())
    })
