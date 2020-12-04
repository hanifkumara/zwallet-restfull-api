const express = require('express')
const route = express.Router()
const { getUsers, getUserById, addUser, updateUser, deleteUser } = require('../controller/users')
const { verifyToken } = require('../middleware/auth')
const { uploadMulter } = require('../middleware/upload')
const { deleteCacheAllUsers, getCacheAllUsers, cacheUserId } = require('../middleware/redis')

route
  .get('/', getCacheAllUsers, getUsers)
  .get('/:id', verifyToken, cacheUserId, getUserById)
  .post('/', verifyToken, deleteCacheAllUsers, addUser)
  .patch('/', verifyToken, uploadMulter.single('photo'), deleteCacheAllUsers, updateUser)
  .delete('/:id', deleteCacheAllUsers, verifyToken, deleteUser)
module.exports = route
