const express = require('express')
const route = express.Router()
const { getUsers, getUserById, addUser, updateUser, deleteUser, myProfile, searchUser, listUsers, updateUserId } = require('../controller/users')
const { verifyToken, roleAdmin } = require('../middleware/auth')
const { uploadMulter } = require('../middleware/upload')
const { deleteCacheAllUsers, getCacheAllUsers, cacheUserId } = require('../middleware/redis')

route
  .get('/', getUsers)
  .get('/search', searchUser)
  .get('/myprofile', verifyToken, myProfile)
  .get('/listusers', verifyToken, listUsers)
  .get('/:id', verifyToken, getUserById)
  .post('/', verifyToken, deleteCacheAllUsers, addUser)
  .patch('/', verifyToken, uploadMulter.single('photo'), deleteCacheAllUsers, updateUser)
  .patch('/updatereceiver', verifyToken, updateUserId)
  .delete('/:id', roleAdmin, deleteCacheAllUsers, deleteUser)
module.exports = route
