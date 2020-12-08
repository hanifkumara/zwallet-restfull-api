const bcrypt = require('bcryptjs')
const { checkEmail, checkUser, insertUser } = require('../models/auth')
const createError = require('http-errors')
const helper = require('../helpers/helper')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const { sendEmail } = require('../helpers/email')


exports.login = (req, res, next) => {
  const { username, password } = req.body
  checkUser(username)
    .then(result => {
      if (result.length > 0) {
        const user = result[0]
        if (user.confirmed !== 1) return helper.response(res, 401, null, { message: 'Not yet verification your email!!' })
        bcrypt.compare(password, user.password, function (err, resCheck) {
          if (!resCheck) return helper.response(res, 401, null, { message: 'Password Wrong!!' })
          delete user.password
          delete user.pin
          delete user.confirmed
          
          const payload = {
            userId: user.id,
            email: user.email,
            roleId: user.roleId
          }
          console.log('ini apa', payload.roleId)
          jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '20m' }, function (err, token) {
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
  let {
    username,
    email,
    password,
    roleId
  } = req.body
  if (!roleId) {
    roleId = "2" 
  }
  checkEmail(email)
    .then(result => {
      if (result.length > 0) return helper.response(res, 401, null, { message: 'Email already exist!!' })
      checkUser(username)
        .then(result => {
          if (result.length > 0) return helper.response(res, 401, null, { message: 'Username already exist!!' })
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
              const data = {
                id,
                username,
                email,
                password: hash,
                roleId,
                createdAt: new Date(),
                updatedAt: new Date()
              }
              jwt.sign({ user: data.id }, process.env.SECRET_KEY, { expiresIn: '1d' }, (err, emailToken) => {
                const url = `${process.env.BASE_URL}/v1/auth/confirmation/${emailToken}`;
                sendEmail(data.email, url)
              },
              );
              insertUser(data)
                .then((result) => {
                  console.log(result)
                  return helper.response(res, 201, { message: 'Register sucsess, check your email for verification account' }, null)
                })
                .catch((err) => {
                  console.log(err.message)
                  return helper.response(res, 401, null, { message: 'Register failed' })
                })
            })
          })
        })
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}

// exports.sendEmail = (req, res) => {
//   const email = req.body.email
//   const message = req.body.message
//   sendEmail(email, message)
//     .then(result => {
//       return helper.response(res, 200, { id: result.messageId }, null)
//     })
//     .catch(err => {
//       return helper.response(res, 500, null, { message: 'Send email Error' })
//     })
// }