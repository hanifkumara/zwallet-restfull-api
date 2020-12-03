const express = require('express')
const route = express.Router()
const {login, register} = require('../controller/auth')

route
 .post('/login', login)
 .post('/register', register)

module.exports = route