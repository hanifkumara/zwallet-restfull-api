const express = require('express')
const route = express.Router()
const transactionController = require('../controller/transaction')

route
    .get('/', transactionController.getTransaction)
    .get('/:id', transactionController.getTransactionById)
    .post('/', transactionController.addTranaction)
    .patch('/:id', transactionController.updateTransaction)
    .delete('/:id', transactionController.deleteTransaction)
module.exports = route