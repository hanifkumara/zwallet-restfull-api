const connection = require('../config/db')

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
exports.getTransactionBySender = (id, limit, offset) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT transaction.*,user_receiver.phone as phoneReceiver, user_receiver.name as receiver, user_receiver.photo as receiverPhoto from transaction INNER JOIN users user_sender ON transaction.userSenderId = user_sender.id INNER JOIN users user_receiver ON transaction.userReceiverId = user_receiver.id WHERE userSenderId = ${id} LIMIT ${offset}, ${limit}`, (error, result) => {
      if (!error) {
        connection.query('SELECT COUNT(userSenderId) FROM transaction WHERE userSenderId = 3', (error2, result2) => {
          resolve({
            data: result,
            rows: result2[0]['COUNT(userSenderId)']
          })
        })
      } else {
        reject(error)
      }
    })
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
