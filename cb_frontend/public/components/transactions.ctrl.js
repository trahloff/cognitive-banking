angular
    .module('transactionCtrls', [])
    .controller('transactionCtrl', ($mdDialog, $scope, $stateParams, $state, transactionService) => {
      $scope.transaction = $stateParams.selectedTransaction === null ? {
        e2e_ref: '56023495265563153232232712531',
        konto: 'DE43231913156078414850',
        betrag: 200.00,
        beleg: '812128',
        buchungstag: '01.03.2017',
        wertstellungstag: '01.03.2017',
        empfaenger_or_zahlungspflichtiger: 'IBM ',
        transaktion_art: 'Kartenzahlung',
        umsatzdetails_or_verwendungszweck: 'Kartenzahlung girocard 028-01723222-6521325138 IBM DEUTSCHLAND EU-DE 0423232452180896524',
        verwendungsschluessel: 'garantierte Debitkartenzahlung (IDCP)',
        glaeubiger_id: 'DE944834300562322322423',
        mandatsreferenz: 'OFFLINE',
        type: 'Special Interest' } : $stateParams.selectedTransaction

      $scope.flagTransaction = type => {
        transactionService.updateTransaction($scope.transaction.e2e_ref, type,
            (err, result) => {
              $scope.transaction.type = type
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
