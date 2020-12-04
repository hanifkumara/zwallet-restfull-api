const bcrypt = require('bcryptjs')
const { checkEmail, checkUser, insertUser } = require('../models/auth')
const createError = require('http-errors')
const helper = require('../helpers/helper')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')

exports.login = (req, res, next) => {
  const { username, password } = req.body
  checkUser(username)
    .then(result => {
      if (result.length > 0) {
        const user = result[0]
        bcrypt.compare(password, user.password, function (err, resCheck) {
          if (!resCheck) return helper.response(res, 401, null, { message: 'Password Wrong!!' })
          delete user.password

          const payload = {
            userId: user.id,
            email: user.email
          }
          jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '5h' }, function (err, token) {
            user.token = token
            return helper.response(res, 200, user, null)
          })
        })
      } else {
        return helper.response(res, 401, null, { message: 'Username Unlisted!!' })
      }
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}

exports.register = (req, res, next) => {
  const id = uuidv4()
  const {
    username,
    email,
    password
  } = req.body
  checkEmail(email)
    .then(result => {
      console.log(result)
      if (result.length > 0) return helper.response(res, 401, null, { message: 'Email already exist!!' })
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          const data = {
            id,
            username,
            email,
            password: hash,
            createdAt: new Date(),
            updatedAt: new Date()
          }
          insertUser(data)
            .then(() => {
              return helper.response(res, 201, { message: 'Register Sucsess' }, null)
            })
        })
      })
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}
