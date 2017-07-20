angular
    .module('transactionCtrls', [])
    .controller('transactionCtrl', ($scope, $stateParams) => {
      console.log($stateParams.selectedTransaction)
    })
