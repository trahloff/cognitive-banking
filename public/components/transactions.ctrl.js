angular
    .module('transactionCtrls', [])
    .controller('transactionCtrl', ($mdDialog, $scope, $stateParams, $state, $http, transactionService) => {
      if (!$stateParams.selectedTransaction) {
        $mdDialog.show(
            $mdDialog.alert()
            .title('Bitte Transaktion auswählen')
            .hasBackdrop(false)
            .ok('OK')
        ).then(() => {
          $state.go('main.overview')
        })
      } else {
        $scope.transaction = $stateParams.selectedTransaction
      }

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
            error => alert(error)
          )
        })
      }
    })
