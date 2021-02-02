const express = require('express')
const jwt = require('jsonwebtoken')
const route = express.Router()
const { login, register, forgotPassword, resetPassword } = require('../controller/auth')
const {deleteCacheAllUsers} = require('../middleware/redis')
const helper = require('../helpers/helper')
const { verifyUser } = require('../models/auth')

route
  .post('/login', login)
  .post('/register', deleteCacheAllUsers, register)
  .get('/confirmation/:token', async (req, res) => {
    try {
      const coba = jwt.verify(req.params.token, process.env.SECRET_KEY)
      const id = coba.user
      await verifyUser(id)
    } catch (error) {
      return helper.response(res, 401, null, { message: 'Something went wrong!!' })
    }
    return helper.response(res, 201, { message: 'Verification Email Success!!' }, null)
  })
  .post('/forgot-password', forgotPassword)
  .patch('/reset-password', resetPassword)

module.exports = route
