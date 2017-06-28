angular
    .module('overviewCtrls', [])
    .controller('overviewCtrl', ($scope, $http) => {
      const load = () => {
        $scope.line = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Oktober', 'November', 'Dezember'],
          series: ['Series A', 'Series B'],
          data: [
            [65, 59, 80, 81, 56, 55, 40, 10, 80, 30, 70, 40],
            [28, 48, 40, 19, 86, 27, 90, 20, 20, 40, 25, 65]
          ]
        }

        $scope.pie = {
          labels: ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'],
          series: ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'],
          data: [350, 450, 100]
        }

        $scope.radar = {
          labels: ['Food', 'Drugs', 'Alcohol', 'Tech', 'Watches', 'ScamCoins', 'Whatever'],
          data: [[65, 90, 90, 81, 56, 55, 40]]
        }

        $scope.bar = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          series: ['2016', '2017'],
          data: [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
          ]
        }
      }

      ;(init => {
        setTimeout(() => {
          load()
        }, 0)
      })()

      $scope.changeYear = () => {
        alert()
      }
    })
