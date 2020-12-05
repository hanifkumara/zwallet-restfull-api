const express = require('express')
const route = express.Router()
const { login, register } = require('../controller/auth')
const {deleteCacheAllUsers} = require('../middleware/redis')

route
  .post('/login', login)
  .post('/register', deleteCacheAllUsers, register)

module.exports = route
