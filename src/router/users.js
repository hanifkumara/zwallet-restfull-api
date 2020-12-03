const express = require('express')
const route = express.Router()
const {getUsers, getUserById, addUser, updateUser, deleteUser} = require('../controller/users')
const {verifyToken} = require('../middleware/auth')
const {uploadMulter} = require('../middleware/upload')

route
  .get('/', verifyToken, getUsers)
  .get('/:id', verifyToken, getUserById)
  .post('/', verifyToken, uploadMulter.single('image'), addUser)
  .patch('/:id', verifyToken,updateUser)
  .delete('/:id', verifyToken,deleteUser)
module.exports = route
