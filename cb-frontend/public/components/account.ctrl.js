angular
.module('accountCtrls', ['ngMaterial', 'ngMessages'])
.controller('accountCtrl', ($scope, $rootScope) => {
  $scope.user = {lastEvents: '- 06/06 12:03:11 Fraud detected\n\n- 06/06 19:53:02 Forecast for Client #198714 generated'}
})
.config(['$mdThemingProvider', $mdThemingProvider => {
  // Configure a dark theme with primary foreground yellow
  $mdThemingProvider.theme('docs-dark', 'default')
    .primaryPalette('yellow')
    .dark()
}])
