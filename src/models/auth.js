const connection = require('../config/db')

exports.checkEmail = (email) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE email = ?', email, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

exports.checkUser = (username) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE username = ?', username, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}


exports.insertUser = (data) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO users SET ? `, data, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}