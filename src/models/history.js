const connection = require('../config/db')

const history = {
  getHistory: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT transaction_history.*,users.name AS name_receiver, users.photo AS photo_receiver, users.phone AS phone_receiver, users.createdAt, transaction.amountTransfer from transaction_history INNER JOIN transaction ON transaction_history.transaction_id = transaction.id INNER JOIN users ON transaction.userReceiverId = users.id ORDER BY createdAt DESC', (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  },
  getHistoryById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT transaction_history.*,users.name AS name_receiver, users.photo AS photo_receiver, users.phone AS phone_receiver, users.createdAt, transaction.amountTransfer from transaction_history INNER JOIN transaction ON transaction_history.transaction_id = transaction.id INNER JOIN users ON transaction.userReceiverId = users.id WHERE transaction_history.id = ?', id, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  }
}
module.exports = history
