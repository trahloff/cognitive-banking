const socketIO = require('socket.io')
let io

exports.init = server => io = socketIO(server)

exports.sendNewTransaction = transaction => {
  if (io) io.emit('newTransaction', transaction)
}
