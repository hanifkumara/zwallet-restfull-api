const express = require('express')
const route = express.Router()
const routeUsers = require('./users')
const routeTransaction = require('./transaction')
const routeAuth = require('./auth')

route
  .use('/users', routeUsers)
  .use('/transaction', routeTransaction)
  .use('/auth', routeAuth)
  .use('/upload', express.static('./image'))


module.exports = route
