const express = require('express');
const route = express.Router();
const {
	getTransaction,
	getTransactionBySender,
	getTransactionById,
	addTranaction,
	updateTransaction,
	deleteTransaction,
	getIncomeTransaction,
	summaryTransaction
} = require('../controller/transaction');
const { verifyToken, roleAdmin } = require('../middleware/auth');

route
	.get('/', roleAdmin, getTransaction)
	.get('/idSender', verifyToken, getTransactionBySender)
	.get('/income', verifyToken, getIncomeTransaction)
	.get('/summary', verifyToken, summaryTransaction)
	.get('/idSender/:idTransaction', verifyToken, getTransactionBySender)
	.get('/:id', verifyToken, getTransactionById)
	.post('/', verifyToken, addTranaction)
	.patch('/:id', verifyToken, updateTransaction)
	.delete('/:id', verifyToken, deleteTransaction);
module.exports = route;
