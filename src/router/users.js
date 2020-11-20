const express = require('express')
const route = express.Router()
const usersController = require('../controller/users')

route
  .get('/', usersController.getUsers)
  .get('/:id', usersController.getUserById)
  .post('/', usersController.addUser)
  .patch('/:id', usersController.updateUser)
  .delete('/:id', usersController.deleteUser)
module.exports = route
