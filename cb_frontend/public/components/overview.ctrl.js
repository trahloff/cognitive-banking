angular
    .module('overviewCtrls', [])
    .controller('overviewCtrl', ($scope, $mdDialog, $rootScope, allocationService, historyService) => {
      // =====================================================================
      $scope.spendingYear = 2016

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

      $scope.radar = {
        labels: null,
        series: [null, '2017'],
        data: []
      }

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

      const loadHistory = (year, cb) => {
        const position = year === 2017 ? 1 : 0
        historyService.getSpendingHistory($rootScope.userProfile.name, year, r => {
          $scope.line.labels = r.labels
          $scope.line.data[position] = r.data
          $scope.line.series[position] = year.toString()

          $scope.bar.labels = r.labels
          $scope.bar.data[position] = r.data
          $scope.bar.series[position] = year.toString()

          historyService.getSpendingHabits($rootScope.userProfile.name, year, r => {
            $scope.radar.labels = r.labels
            $scope.radar.data[position] = r.data
            $scope.radar.series[position] = year.toString()

            if (cb) cb()
          })
        })
      }

      /*
       * IIFE (imediately invoked function expression)
       * loads data into view, needs 1ms timeout to trigger proper graph animations
       */
      ;(init => {
        setTimeout(() => { // needs timeout to trigger chart animation
          allocationService.getAllocation($rootScope.userProfile.name, r => {
            $scope.doughnut = r
          })
        }, 1)

        loadHistory(2017, () => {
          loadHistory($scope.spendingYear)
        })
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
          if (isNaN(parsedResult) || parsedResult < 2014 || parsedResult > 2017) {
            $mdDialog.show(
              $mdDialog.alert()
                .title('Nope')
                .textContent('Please enter a valid year')
                .hasBackdrop(false)
                .ok('Yep')
            )
          } else {
            $scope.spendingYear = parsedResult
            loadHistory(parsedResult)
          }
        })
      }
    })
