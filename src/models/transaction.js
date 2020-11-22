const connection = require('../config/db')

const transaction = {
  getTransaction: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT transaction.*,user_sender.name as sender, user_receiver.name as receiver from transaction INNER JOIN users user_sender ON transaction.userSenderId = user_sender.id INNER JOIN users user_receiver ON transaction.userReceiverId = user_receiver.id ORDER BY createdAt DESC', (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  },
  getTransactionById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT transaction.*,user_sender.name as sender, user_receiver.name as receiver from transaction INNER JOIN users user_sender ON transaction.userSenderId = user_sender.id INNER JOIN users user_receiver ON transaction.userReceiverId = user_receiver.id WHERE transaction.id = ?', id, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  },
  addTransaction: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO transaction SET ?', data, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  },
  updateTransaction: (id, data) => {
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
  deleteTransaction: (id) => {
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
}

module.exports = transaction
