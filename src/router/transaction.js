const express = require('express')
const route = express.Router()
const { getTransaction, getTransactionBySender, getTransactionById, addTranaction, updateTransaction, deleteTransaction } = require('../controller/transaction')
const { verifyToken } = require('../middleware/auth')

route
  .get('/', verifyToken, getTransaction)
  .get('/idSender', verifyToken, getTransactionBySender)
  .get('/idSender/:idTransaction', verifyToken, getTransactionBySender)
  .get('/:id', verifyToken, getTransactionById)
  .post('/', verifyToken, addTranaction)
  .patch('/:id', verifyToken, updateTransaction)
  .delete('/:id', verifyToken, deleteTransaction)
module.exports = route
