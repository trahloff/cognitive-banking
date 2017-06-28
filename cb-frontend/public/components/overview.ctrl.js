angular
    .module('overviewCtrls', [])
    .controller('overviewCtrl', ($scope, $mdDialog) => {
      const load = () => {
        $scope.line = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Oktober', 'November', 'Dezember'],
          series: ['Series A', 'Series B'],
          data: [
            [65, 59, 80, 81, 56, 55, 40, 10, 80, 30, 70, 40],
            [28, 48, 40, 19, 86, 27, 90, 20, 20, 40, 25, 65]
          ]
        }

        $scope.pie = {
          labels: ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'],
          series: ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'],
          data: [350, 450, 100]
        }

        $scope.radar = {
          labels: ['Food', 'Drugs', 'Alcohol', 'Tech', 'Watches', 'ScamCoins', 'Whatever'],
          data: [[65, 90, 90, 81, 56, 55, 40]]
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

      const showPrompt = () => {
        // const confirm = $mdDialog.prompt()
        //                   .title('What would you name your dog?')
        //                   .textContent('Bowser is a common name.')
        //                   .placeholder('Change Year')
        //                   .initialValue('Buddy')
        //                   .ok('Okay!')
        //                   .hasBackdrop(false)

        var confirm = $mdDialog.confirm()
.parent(angular.element(document.body))
.title('Would you like to delete your debt?')
.content('All of the banks have agreed to forgive you your debts.')
.ariaLabel('Lucky day')
.ok('Please do it!')
.cancel('Sounds like a scam')
.hasBackdrop(false)

        $mdDialog.show(confirm).then(result => {
          console.log('You decided to name your dog ' + result + '.')
        })
      }

      $scope.showPrompt = function (ev) {
    // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
      .title('What would you name your dog?')
      .textContent('Bowser is a common name.')
      .placeholder('Dog name')
      .ariaLabel('Dog name')
      .initialValue('Buddy')
      .targetEvent(ev)
      .hasBackdrop(false)
      .ok('Okay!')
      .cancel('I\'m a cat person')

        $mdDialog.show(confirm).then(function (result) {
          $scope.status = 'You decided to name your dog ' + result + '.'
        }, function () {
          $scope.status = 'You didn\'t name your dog.'
        })
      }

      ;(init => {
        setTimeout(() => {
          load()
        }, 0)
      })()

      $scope.changeYear = () => {
        showPrompt()
      }
    })
