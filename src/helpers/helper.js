const connection = require('../config/db')

module.exports = {
  response: (res, status, result, err, pagination = null) => {
    const resultPrint = {}
    resultPrint.status = 'success'
    resultPrint.statusCode = status
    resultPrint.result = result
    resultPrint.err = err
    resultPrint.pagination = pagination
    return res.status(resultPrint.statusCode).json(resultPrint)
  },

  actionQuery: (...args) => {
    return new Promise((resolve, reject) => {
      connection.query(...args, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  }
}
