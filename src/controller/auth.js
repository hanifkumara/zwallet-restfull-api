const bcrypt = require('bcryptjs')
const { checkEmail, checkUser, insertUser } = require('../models/auth')
const {updateUser} = require('../models/users')
const createError = require('http-errors')
const helper = require('../helpers/helper')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const { sendEmail, emailForgotPassword } = require('../helpers/email')


exports.login = (req, res, next) => {
  const { email, password } = req.body
  checkEmail(email)
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
          jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '5h' }, function (err, token) {
            user.token = token
            return helper.response(res, 200, user, null)
          })
          
        })
      } else {
        return helper.response(res, 401, null, { message: 'Email Unlisted!!' })
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
                photo: 'https://placekitten.com/320/320',
                name: username,
                username,
                email,
                phone: '08xxxxxxxx',
                phone2: 'null',
                password: hash,
                balance: 0,
                roleId,
                createdAt: new Date(),
                updatedAt: new Date()
              }
              jwt.sign({ user: data.id }, process.env.SECRET_KEY, { expiresIn: '5h' }, (err, emailToken) => {
                const url = `${process.env.BASE_URL_FRONTEND}/confirmation/${emailToken}`;
                insertUser(data)
                .then((result) => {
                  console.log(result)
                  return helper.response(res, 201, { message: 'Register sucsess, check your email for verification account', emailToken }, null)
                })
                .catch((err) => {
                  console.log(err.message)
                  return helper.response(res, 401, null, { message: 'Register failed' })
                })
                sendEmail(data.email, url)
                  .then((result) => {
                    console.log(result)
                  })
                  .catch((err) => {
                    return helper.response(res, 401, null, { message: 'Something went wrong!' })
                  });
                },
              );
            })
          })
        })
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body
    console.log('ini email', email)
    const resEmail = await checkEmail(email)
    console.log('cek email', resEmail)
    if (resEmail.length < 1) {
      return helper.response(res, 401, null, { message: 'Email not found' })
    } else {
      console.log('ini idnya', resEmail[0].id)
      jwt.sign({ myId: resEmail[0].id }, process.env.SECRET_KEY, { expiresIn: '5h' }, (err, emailToken) => {
        const url = `${process.env.BASE_URL_FRONTEND}/auth/create-password/${emailToken}`;
        emailForgotPassword(email, url)
        return helper.response(res, 201, { token: emailToken, message: 'Send email success. Pelase check your email now' }, null)
      })
    }
  } catch (err) {
    const error = createError.InternalServerError()
    return next(error)
  }
}

exports.resetPassword = (req, res, next) => {
  try {
    const { password } = req.body
    console.log(password)
    const authorization = req.headers.authorization
    if (!authorization) return helper.response(res, 201, null, {message: 'You not have token!!'})
    let token = authorization.split(' ')
    token = token[1]
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        if (err.name === 'JsonWebTokenError') {
          return helper.response(res, 201, null, { message: 'Invalid Token!!' })
        } else if (err.name === 'TokenExpiredError') {
          return helper.response(res, 201, null, {message: 'Token expired'})
        }
      }
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          updateUser(decoded.myId, {password: hash})
            .then(() => {
              console.log(decoded)
              return helper.response(res, 201, { message: 'Reset password success!!' }, null)
            })
        })
      })
      console.log(decoded)
    })
  } catch (error) {
    return helper.response(res, 201, null, { message: 'Something went wrong!!' })
  }
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