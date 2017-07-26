angular
.module('accountCtrls', [])
.controller('accountCtrl', ($scope, $rootScope) => {
})
.config(['$mdThemingProvider', $mdThemingProvider => {
  // Configure a dark theme with primary foreground yellow
  $mdThemingProvider.theme('docs-dark', 'default')
    .primaryPalette('yellow')
    .dark()
}])
