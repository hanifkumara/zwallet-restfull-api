const connection = require('../config/db')

const users = {
  getUsers: (name, phone, limits, offsets) => {
    return new Promise((resolve, reject) => {
      if (name || phone) {
        connection.query('SELECT * FROM users WHERE name LIKE ? OR phone LIKE ?', [`%${name}%`, `%${phone}%`], (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        })
      } else {
        connection.query(`SELECT * FROM users LIMIT ${limits} OFFSET ${offsets}`, (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        })
      }
    })
  },
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  },
  addUser: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO users SET ?', data, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  },
  updateUser: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE users SET ? WHERE id = ?', [data, id], (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  },
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  }
}
module.exports = users
