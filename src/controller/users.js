const usersModel = require('../models/users')
const helper = require('../helpers/helper')
require('dotenv').config()

const users = {
  getUsers: (req, res) => {
    const name = req.query.name
    const phone = req.query.phone
    const page = req.query.page || 1
    const limit = req.query.limit || 3
    const offset = (page - 1) * limit
    usersModel.getUsers(name, phone, limit, offset)
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
      .catch(e => console.log(e))
  },
  getUserById: (req, res) => {
    const id = req.params.id
    usersModel.getUserById(id)
      .then(result => {
        if (result.length === 0) {
          return helper.response(res, 404, null, { message: 'id not found' })
        }
        helper.response(res, 200, result, null)
      })
      .catch(e => {
        return helper.response(res, 500, null, {
          message: 'database error'
        })
      })
  },
  addUser: (req, res) => {
    const { name, phone, photo, username, email, password, pin, balance } = req.body
    const data = { name, phone, photo, username, email, password, pin, balance }
    usersModel.addUser(data)
      .then(result => {
        helper.response(res, 201, result, null)
      })
      .catch(e => console.log(e))
  },
  updateUser: (req, res) => {
    const id = req.params.id
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
    usersModel.updateUser(id, data)
      .then(result => {
        if (result.affectedRows === 0) {
          return helper.response(res, 404, null, { message: 'id not found' })
        }
        helper.response(res, 200, result, null)
      })
      .catch(e => console.log(e))
  },
  deleteUser: (req, res) => {
    const id = req.params.id
    usersModel.deleteUser(id)
      .then(result => {
        if (result.affectedRows === 0) {
          return helper.response(res, 404, null, { message: 'id not found' })
        }
        helper.response(res, 200, result, null)
      })
      .catch(e => console.log(e))
  }
}

module.exports = users
