const connection = require('../config/db')
const { actionQuery } = require('../helpers/helper')

exports.getUsers = (name, phone, limit, offset) => {
  return new Promise((resolve, reject) => {
    if (name || phone) {
      connection.query(`SELECT * FROM users WHERE name LIKE ? OR phone LIKE ?`, [`%${name}%`, `%${phone}%`], (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    } else {
      connection.query(`SELECT * FROM users ORDER BY createdAt DESC LIMIT ${limit} OFFSET ${offset}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    }
  })
},
exports.countUsers = () => {
  return actionQuery('SELECT COUNT(*) AS totalData FROM users')
},
exports.getUserById = (id) => {
  return actionQuery('SELECT * FROM users WHERE id = ?', id)
},

// exports.addUser = (data) => {
//   return actionQuery('INSERT INTO users SET ?', data, id)

// },
exports.updateUser = (myId, data) => {
  return actionQuery('UPDATE users SET ? WHERE id = ?', [data, myId])
},

exports.deleteUser = (id) => {
  return actionQuery('DELETE FROM users WHERE id = ?', id)
}
