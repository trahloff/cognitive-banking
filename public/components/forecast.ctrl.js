angular
    .module('forecastCtrls', [])
    .controller('forecastCtrl', ($scope, $http) => {
      // $scope.forecast = {
      //   labels: null,
      //   series: [null],
      //   data: []
      // }
      $scope.forecast = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        series: 'Kontostand',
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
      }
      /*
       * shows prompt to change the year
       */
      $scope.notifyBank = () => {
        $mdDialog.show(
          $mdDialog.prompt()
           .title('Bank Benachrichtigen')
           .textContent('Nachricht an Ihren persönlichen Bankberater:')
           .placeholder('Nachricht')
           .hasBackdrop(false)
           .ok('Senden')
           .cancel('Abbrechen')
        ).then(message => {
          $http({
            method: 'POST',
            url: `/bank/notify`,
            data: { message: message }
          }).then(
            response => {},
            err => alert(err)
          )
        })
      }

      // if (!$stateParams.selectedTransaction) {
      //   $mdDialog.show(
      //       $mdDialog.alert()
      //       .title('Bitte Transaktion auswählen')
      //       .hasBackdrop(false)
      //       .ok('OK')
      //   ).then(() => {
      //     $state.go('main.overview')
      //   })
      // } else {
      //   $scope.transaction = $stateParams.selectedTransaction
      // }
    })
