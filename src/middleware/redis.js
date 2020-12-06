const redis = require('redis')
const client = redis.createClient(6379)

const { response } = require('../helpers/helper')

exports.getCacheAllUsers = (req, res, next) => {
  client.get('getAllUsers', function (err, data) {
    if (data !== null) {
      console.log('debug controller')
      const result = JSON.parse(data)
      delete result[0].password
      return response(res, 200, result, null)
    }
    next()
  })
}
exports.cacheUserId = (req, res, next) => {
  const id = req.params.id
  client.get('cacheUserId' + id, function (err, data) {
    console.log(data)
    if (data !== null) {
      const result = JSON.parse(data)
      return response(res, 200, result, null)
    }
    next()
  })
}
exports.deleteCacheAllUsers = (req, res, next) => {
  client.del('getAllUsers')
  next()
}
