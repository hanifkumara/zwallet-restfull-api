const {getUsers, getUserById, addUser, updateUser, deleteUser} = require('../models/users')
const helper = require('../helpers/helper')
const createError = require('http-errors')
require('dotenv').config()
const bcrypt = require('bcryptjs');

exports.getUsers = (req, res, next) => {
  const name = req.query.name
  const phone = req.query.phone
  const page = req.query.page || 1
  const limit = req.query.limit || 3
  const offset = (page - 1) * limit
  getUsers(name, phone, limit, offset)
    .then(result => {
      if (result.length === 0) {
        return helper.response(res, 404, null, { message: 'data not found' })
      }
      const pagination = {
        previousPage: page - 1 > 0 ? `${process.env.BASE_URL}/users?page=${page - 1}` : null,
        currentPage: `${process.env.BASE_URL}/users?page=${page}`,
        nextPage: parseInt(page) + 1 > limit ? null : `${process.env.BASE_URL}/users?page=${parseInt(page) + 1}`
      }
      helper.response(res, 200, result, null, pagination)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
},
exports.getUserById = (req, res, next) => {
  const id = req.params.id
  getUserById(id)
    .then(result => {
      if (result.length === 0) {
        return helper.response(res, 404, null, { message: 'id not found' })
      }
      helper.response(res, 200, result, null)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
},
exports.addUser = (req, res, next) => {
  const { name, phone, photo, username, email, password, pin, balance } = req.body
  const data = { name, phone, photo, username, email, password, pin, balance }
  addUser(data)
    .then(result => {
      const resultData = {
        insertId : result.insertId,
        data: { ...data}
      }
      helper.response(res, 201, resultData, null)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
},
exports.updateUser = (req, res, next) => {
  const {myId} = req
  console.log('ini id saya', myId)
  const { name, phone, photo, username, email, password, pin, balance } = req.body
  const data = {}
  if (name) {
    data.name = req.body.name
  }
  if (phone) {
    data.phone = req.body.phone
  }
  if (photo) {
    data.photo = req.body.photo
  }
  if (username) {
    data.username = req.body.username
  }
  if (email) {
    data.email = req.body.email
  }
  if (password) {
    data.password = req.body.password
  }
  if (pin) {
    data.pin = req.body.pin
  }
  if (balance) {
    data.balance = req.body.balance
  }
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      data.password = hash
      console.log(`ini data nya`,data)
      updateUser(myId, data)
        .then(result => {
          if (result.affectedRows === 0) {
            return helper.response(res, 404, null, { message: 'id not found' })
          }
          helper.response(res, 200, data, null)
        })
        .catch(() => {
          const error = createError.InternalServerError()
          return next(error)
        })
    })
  })
},

exports.deleteUser = (req, res, next) => {
  const id = req.params.id
  deleteUser(id)
    .then(result => {
      if (result.affectedRows === 0) {
        return helper.response(res, 404, null, { message: 'id not found' })
      }
      helper.response(res, 200, {message : 'delete sucess'}, null)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}
