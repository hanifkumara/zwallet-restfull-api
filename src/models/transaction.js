const connection = require('../config/db')
const { actionQuery } = require('../helpers/helper')

exports.getTransaction = (sort, limit, offset) => {
  return actionQuery(`SELECT transaction.*,user_sender.name as sender, user_receiver.name as receiver, user_receiver.photo as receiverPhoto from transaction INNER JOIN users user_sender ON transaction.userSenderId = user_sender.id INNER JOIN users user_receiver ON transaction.userReceiverId = user_receiver.id ORDER BY createdAt ${sort} LIMIT ${offset}, ${limit}`)
},
exports.getTransactionBySender = (myId, name,  limit, offset, idTransaction, sort) => {
  if (idTransaction) {
    return actionQuery(`SELECT * FROM transaction WHERE userSenderId = '${myId}' && id = ${idTransaction}`)
  } else if (myId, offset, limit, name, sort){
    return actionQuery(`SELECT transaction.*,user_receiver.username as receiverUsername, user_receiver.balance as balanceReceiver , user_receiver.phone as phoneReceiver, user_receiver.name as receiver, user_receiver.photo as receiverPhoto from transaction INNER JOIN users user_sender ON transaction.userSenderId = user_sender.id INNER JOIN users user_receiver ON transaction.userReceiverId = user_receiver.id WHERE userSenderId = '${myId}' AND user_receiver.name LIKE '%${name}%' ORDER BY createdAt ${sort} LIMIT ${offset}, ${limit}`)
  } else {
    return actionQuery(`SELECT transaction.*, user_receiver.username as receiverUsername, user_receiver.phone as phoneReceiver, user_receiver.name as receiver, user_receiver.photo as receiverPhoto from transaction INNER JOIN users user_sender ON transaction.userSenderId = user_sender.id INNER JOIN users user_receiver ON transaction.userReceiverId = user_receiver.id WHERE userSenderId = '${myId}' ORDER BY createdAt DESC LIMIT ${offset}, ${limit}`)
  }
},
exports.getTransactionById = (id) => {
  return actionQuery('SELECT * FROM transaction WHERE id = ? ', id)
},
exports.addTransaction = (data) => {
  return actionQuery('INSERT INTO transaction SET ?', data)
},
exports.updateTransaction = (id, data) => {
  return actionQuery('UPDATE transaction SET ? WHERE id = ?', [data, id])
},
exports.deleteTransaction = (id) => {
  return actionQuery('DELETE FROM transaction WHERE id = ?', id)
}
exports.countTransaction = (myId) => {
  return actionQuery(`SELECT COUNT(*) AS totalData FROM transaction WHERE userSenderId  = '${myId}'`)
}