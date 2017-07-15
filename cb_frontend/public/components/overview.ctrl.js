angular
    .module('overviewCtrls', [])
    .controller('overviewCtrl', ($scope, $mdDialog, $rootScope, allocationService) => {
      // =====================================================================

      $scope.events = {
        data: [
                  {type: 'Fraud', timestamp: 123},
                  {type: 'Overspending', timestamp: 124},
                  {type: 'Fraud', timestamp: 125},
                  {type: 'Wage', timestamp: 126},
                  {type: 'Aunt Mary', timestamp: 127},
                  {type: 'Fraud', timestamp: 128},
                  {type: 'Fraud', timestamp: 128},
                  {type: 'Fraud', timestamp: 128},
                  {type: 'Fraud', timestamp: 128},
                  {type: 'Fraud', timestamp: 128},
                  {type: 'Fraud', timestamp: 128},
                  {type: 'Fraud', timestamp: 128},
                  {type: 'Fraud', timestamp: 128},
                  {type: 'Fraud', timestamp: 128},
                  {type: 'Fraud', timestamp: 128},
                  {type: 'Fraud', timestamp: 128},
                  {type: 'Fraud', timestamp: 128},
                  {type: 'Fraud', timestamp: 128},
                  {type: 'Fraud', timestamp: 128},
                  {type: 'Fraud', timestamp: 128}
        ],
        count: 5
      }

      $scope.query = {
        order: '-count', // the '-' tells md-data-tables to sort it in descending order. don't rely on their documentation, it is garbage.
        limit: 4,
        page: 1
      }

      $scope.selected = []
      // =====================================================================

      const load = () => {
        $scope.spendingYear = 2016

        $scope.line = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Oktober', 'November', 'Dezember'],
          series: ['2016', '2017'],
          data: [
            [65, 59, 80, 81, 56, 55, 40, 10, 80, 30, 70, 40],
            [28, 48, 40, 19, 86, 27, 90, 20, 20, 40, 25, 65]
          ]
        }

        allocationService.getAllocation($rootScope.userProfile.name, r => {
          $scope.doughnut = r
        })

        $scope.radar = {
          labels: ['Food', 'Drugs', 'Alcohol', 'Tech', 'Watches', 'ScamCoins', 'Whatever'],
          series: ['2016', '2017'],
          data: [
            [65, 90, 90, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
          ]
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

      $scope.showPrompt = () => {
        const confirm = $mdDialog.prompt()
                        .title('Change Year')
                        .textContent('Compare your spendings in 2017 to:')
                        .placeholder('Year')
                        .initialValue($scope.spendingYear)
                        .hasBackdrop(false)
                        .ok('Okay!')

        $mdDialog.show(confirm).then(result => {
          const parsedResult = Number(result)

          $scope.spendingYear = parsedResult

          switch (parsedResult) {
            case 2015:
              $scope.bar = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                series: ['2015', '2017'],
                data: [
              [25, 49, 60, 65, 76, 75, 20],
              [28, 48, 40, 19, 86, 27, 90]
                ]
              }
              break
            case 2014:
              $scope.bar = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                series: ['2014', '2017'],
                data: [
                [15, 29, 30, 95, 56, 75, 60],
                [28, 48, 40, 19, 86, 27, 90]
                ]
              }
              break
            default:
              $scope.bar = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                series: ['2016', '2017'],
                data: [
              [65, 59, 80, 81, 56, 55, 40],
              [28, 48, 40, 19, 86, 27, 90]
                ]
              }
          }
        })
      }

      /*
       * IIFE (imediately invoked function expression)
       * loads data into view, needs 1ms timeout to trigger proper graph animations
       */
      ;(init => {
        setTimeout(() => {
          load()
        }, 1)
      })()

      /*
       * shows prompt to change the year
       */
      $scope.changeYear = () => {
        showPrompt()
      }
    })
