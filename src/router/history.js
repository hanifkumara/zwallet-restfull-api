const express = require('express')
const route = express.Router()
const historyController = require('../controller/history')

route
  .get('/', historyController.getHistory)
  .get('/:id', historyController.getHistoryById)

module.exports = route
