const jwt = require('jsonwebtoken')
const helper = require('../helpers/helper')

exports.verifyToken = (req, res, next) => {
  let authorization = req.headers.authorization
  let token = authorization.split(' ')
  token = token[1]

  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      if (err.name === 'JsonWebTokenError') {
        return helper.response(res, 401, null, {message: 'Invalid Token'})
      } else if (err.name === 'TokenExpiredError')
        return helper.response(res, 401, null, { message: 'Token Expired' })
    }
    req.myId = decoded.userId
    next()
  });
}