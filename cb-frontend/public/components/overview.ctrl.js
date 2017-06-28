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

      $scope.line_labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Oktober', 'November', 'Dezember']
      $scope.line_series = ['Series A', 'Series B']

      $scope.line_data = [
        [65, 59, 80, 81, 56, 55, 40, 10, 80, 30, 70, 40],
        [28, 48, 40, 19, 86, 27, 90, 20, 20, 40, 25, 65]
      ]

      $scope.pie_labels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales']
      $scope.pie_data = [350, 450, 100]

      $scope.radar_labels = ['Food', 'Drugs', 'Alcohol', 'Tech', 'Watches', 'ScamCoins', 'Whatever']
      $scope.radar_data = [
        [65, 59, 90, 81, 56, 55, 40]
      ]
    })
