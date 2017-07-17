angular
    .module('overviewCtrls', [])
    .controller('overviewCtrl', ($scope, $mdDialog, $rootScope, allocationService, historyService) => {
      // =====================================================================
      $scope.line = {
        labels: null,
        series: [null, '2017'],
        data: []
      }

      $scope.bar = {
        labels: null,
        series: [null, '2017'],
        data: []
      }

      $scope.spendingYear = 2016

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

      // =====================================================================

      const reloadHistory = year => {
        historyService.getSpendingHistory($rootScope.userProfile.name, $scope.spendingYear, r => {
          $scope.line.labels = r.labels
          $scope.line.data[0] = r.data
          $scope.line.series[0] = $scope.spendingYear.toString()

          $scope.bar.labels = r.labels
          $scope.bar.data[0] = r.data
          $scope.bar.series[0] = $scope.spendingYear.toString()
        })
      }

      const load = () => {
        allocationService.getAllocation($rootScope.userProfile.name, r => {
          $scope.doughnut = r
        })

        historyService.getSpendingHistory($rootScope.userProfile.name, $scope.spendingYear, r => {
          $scope.line.labels = r.labels
          $scope.bar.labels = r.labels
          $scope.line.data.push(r.data)
          $scope.bar.data.push(r.data)
          historyService.getSpendingHistory($rootScope.userProfile.name, 2017, r => {
            $scope.line.data.push(r.data)
            $scope.bar.data.push(r.data)
            $scope.line.series[0] = $scope.spendingYear.toString()
            $scope.bar.series[0] = $scope.spendingYear.toString()
          })
        })

        $scope.radar = {
          labels: ['Food', 'Drugs', 'Alcohol', 'Tech', 'Watches', 'ScamCoins', 'Whatever'],
          series: ['2016', '2017'],
          data: [
            [65, 90, 90, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
          ]
        }
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

          reloadHistory(parsedResult)
        })
      }
    })
