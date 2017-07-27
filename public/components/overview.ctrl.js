angular
    .module('overviewCtrls', [])
    .controller('overviewCtrl', ($scope, $mdDialog, $rootScope, $state, allocationService, historyService) => {
      // ==============================Scope Templates=======================================
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
        labels: ['Essen', 'Fußball', 'Arbeitsmaterial', 'Auto', 'Bars', 'Wohnung', 'Verschiedenes'],
        series: [null, '2017'],
        data: []
      }

      $scope.transactions = {
        data: null,
        count: null
      }

      $scope.query = {
        order: '-count', // the '-' tells md-data-tables to sort it in descending order. don't rely on their documentation, it is garbage.
        limit: 4,
        page: 1
      }

      $scope.bold = true

      // =====================================================================

      const loadHistory = (year, callback) => {
        const position = year === 2017 ? 1 : 0 // if it's the current year, insert data at last data-array position, if not at first position
        historyService.getSpendingHistory($rootScope.userProfile.name, year, (error, r) => {
          if (error) console.error(error)
          $scope.line.labels = r.labels
          $scope.line.data[position] = r.data
          $scope.line.series[position] = year.toString()

          $scope.bar.labels = r.labels
          $scope.bar.data[position] = r.data
          $scope.bar.series[position] = year.toString()

          historyService.getSpendingHabits($rootScope.userProfile.name, year, (error, r) => {
            if (error) console.error(error)
            $scope.radar.data[position] = r.data
            $scope.radar.series[position] = year.toString()

            if (callback) callback()
          })
        })
      }

      /*
       * IIFE (imediately invoked function expression)
       * loads data into view, needs 1ms timeout to trigger proper graph animations
       */
      ;(init => {
        setTimeout(() => { // needs timeout to trigger chart animation
          allocationService.getAllocation($rootScope.userProfile.name, (error, r) => {
            if (error) console.error(error)
            $scope.doughnut = r
          })
        }, 1)

        loadHistory(2017, () => { // first load data for current year, than for the year it is compared to
          loadHistory($scope.spendingYear)
        })

        historyService.getTransactions($rootScope.userProfile.name, (error, r) => {
          if (error) console.error(error)
          $scope.transactions.data = r
          $scope.transactions.count = r.length
        })
      })()

      /*
       * shows prompt to change the year
       */
      const changeYear = () => {
        const confirm = $mdDialog.prompt()
                         .title('Jahr Ändern')
                         .textContent('Vergleichen Sie Ihre Ausgaben in 2017 zu:')
                         .placeholder('Jahr')
                         .initialValue($scope.spendingYear)
                         .hasBackdrop(false) // CSS workaround
                         .ok('OK')
                         .cancel('Abbrechen')

        $mdDialog.show(confirm).then(result => {
          const parsedResult = Number(result)
          if (isNaN(parsedResult) || parsedResult < 2014 || parsedResult > 2017) {
            const textContent = isNaN(parsedResult) ? 'Bitte eine valide Jahreszahl eingeben' : 'Es liegen keine Aufzeichnungen von diesem Jahr vor'
            $mdDialog.show(
               $mdDialog.alert()
                 .title('Fehler')
                 .textContent(textContent)
                 .hasBackdrop(false)
                 .ok('OK')
             ).then(() => changeYear())
          } else {
            $scope.spendingYear = parsedResult
            loadHistory(parsedResult)
          }
        })
      }
      $scope.changeYear = changeYear
    })
