const connection = require('../config/db')
const { actionQuery } = require('../helpers/helper')
const fs = require('fs')

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
exports.updateUser = (myId, data) => {
  return actionQuery('UPDATE users SET ? WHERE id = ?', [data, myId])
},

exports.deleteUser = (id) => {
  return actionQuery('DELETE FROM users WHERE id = ?', id)
}

exports.deletePhoto = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT photo FROM users WHERE id = ?`, id, (error, result) => {
      if (!error) {
        if (!result[0].photo) {
          const image = result[0].photo.split('/')[5]
          console.log(result[0])
          const path = `image/${image}`
          fs.unlink(path, (err) => {
            if (err) {
              resolve(err)
            } else {
              resolve({ message: 'Success delete image' })
            }
          })
        }
      } else {
        reject(error)
      }
    })
  })
}