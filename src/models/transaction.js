const connection = require('../config/db')
const { actionQuery } = require('../helpers/helper')

exports.getTransaction = (sort, limit, offset) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT transaction.*,user_sender.name as sender, user_receiver.name as receiver, user_receiver.photo as receiverPhoto from transaction INNER JOIN users user_sender ON transaction.userSenderId = user_sender.id INNER JOIN users user_receiver ON transaction.userReceiverId = user_receiver.id ORDER BY createdAt ${sort} LIMIT ${offset}, ${limit}`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
},
exports.getTransactionBySender = (myId, name,  limit, offset, idTransaction, sort) => {
  console.log(sort)
  return new Promise((resolve, reject) => {
    if (idTransaction) {
      connection.query(`SELECT * FROM transaction WHERE userSenderId = '${myId}' && id = ${idTransaction}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    } else if (myId, offset, limit, name, sort){
      connection.query(`SELECT transaction.*,user_receiver.username as receiverUsername, user_receiver.balance as balanceReceiver , user_receiver.phone as phoneReceiver, user_receiver.name as receiver, user_receiver.photo as receiverPhoto from transaction INNER JOIN users user_sender ON transaction.userSenderId = user_sender.id INNER JOIN users user_receiver ON transaction.userReceiverId = user_receiver.id WHERE userSenderId = '${myId}' AND user_receiver.name LIKE '%${name}%' ORDER BY createdAt ${sort} LIMIT ${offset}, ${limit}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    } else {
      connection.query(`SELECT transaction.*, user_receiver.username as receiverUsername, user_receiver.phone as phoneReceiver, user_receiver.name as receiver, user_receiver.photo as receiverPhoto from transaction INNER JOIN users user_sender ON transaction.userSenderId = user_sender.id INNER JOIN users user_receiver ON transaction.userReceiverId = user_receiver.id WHERE userSenderId = '${myId}' ORDER BY createdAt DESC LIMIT ${offset}, ${limit}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    }
  })
},
exports.getTransactionById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM transaction WHERE id = ? ', id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
},
exports.addTransaction = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO transaction SET ?', data, (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
},
exports.updateTransaction = (id, data) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE transaction SET ? WHERE id = ?', [data, id], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
},
exports.deleteTransaction = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM transaction WHERE id = ?', id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}
exports.countTransaction = (myId) => {
  return actionQuery(`SELECT COUNT(*) AS totalData FROM transaction WHERE userSenderId  = '${myId}'`)
}