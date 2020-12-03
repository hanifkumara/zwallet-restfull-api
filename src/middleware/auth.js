const jwt = require('jsonwebtoken')
const helper = require('../helpers/helper')
const createError = require('http-errors')


exports.verifyToken = (req, res, next) => {
  let authorization = req.headers.authorization
  if (!authorization) {
    return helper.response(res, 401, null, { message: 'You not have Token!' })
  }
  let token = authorization.split(' ')
  token = token[1]
  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      if (err.name === 'JsonWebTokenError') {
        return helper.response(res, 401, null, {message: 'Invalid Token'})
      } else if (err.name === 'TokenExpiredError'){
        return helper.response(res, 401, null, { message: 'Token Expired' })
      }
    }
    req.myId = decoded.userId
    next()
  });
}