angular
  .module('socketFactories', [])
  .factory('socket', ($rootScope, socketFactory, Notification) => {
    const socket = socketFactory()
    socket.on('newTransaction', transaction => {
      $rootScope.transaction = transaction
      const config = {
        message: `New ${transaction.type}`,
        templateUrl: './components/templates/dialogs/transactionNotification.html',
        delay: 10000
      }
      switch (transaction.type) {
        case 'Fraud':
          Notification.error(config)
          break
        case 'Special Interest':
          Notification(config)
          break
        default:
      }
    })
    return socket
  })
