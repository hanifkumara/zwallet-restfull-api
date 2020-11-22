const transactionModel = require('../models/transaction')
const helper = require('../helpers/helper')

const transaction = {
  getTransaction: (req, res) => {
    transactionModel.getTransaction()
      .then(result => {
        const resultTransaction = result
        // res.json(resultTransaction)
        helper.response(res, 200, resultTransaction, null)
      })
      .catch(e => console.log(e.message))
  },
  getTransactionById: (req, res) => {
    const id = req.params.id
    transactionModel.getTransactionById(id)
      .then(result => {
        if (result.length === 0) {
          return helper.response(res, 404, null, { message: 'id not found' })
        }
        helper.response(res, 200, result, null)
      })
      .catch(e => console.log(e.message))
  },
  addTranaction: (req, res) => {
    const { amountTransfer, notes, userSenderId, userReceiverId } = req.body

    const data = {
      amountTransfer,
      notes,
      userSenderId,
      userReceiverId,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    transactionModel.addTransaction(data)
      .then(result => {
        helper.response(res, 200, result, null)
      })
      .catch(e => console.log(e.message))
  },
  updateTransaction: (req, res) => {
    const id = req.params.id
    const { amountTransfer, notes, userSenderId, userReceiverId } = req.body
    const data = {}
    if (amountTransfer) {
      data.amountTransfer = req.body.amountTransfer
    }
    if (notes) {
      data.notes = req.body.notes
    }
    if (userSenderId) {
      data.userSenderId = req.body.userSenderId
    }
    if (userReceiverId) {
      data.userReceiverId = req.body.userReceiverId
    }
    transactionModel.updateTransaction(id, data)
      .then(result => {
        if (result.affectedRows === 0) {
          return helper.response(res, 404, null, { message: 'id not found' })
        }
        helper.response(res, 200, result, null)
      })
      .catch(e => console.log(e.message))
  },
  deleteTransaction: (req, res) => {
    const id = req.params.id
    transactionModel.deleteTransaction(id)
      .then(result => {
        if (result.affectedRows === 0) {
          return helper.response(res, 404, null, { message: 'id not found' })
        }
        helper.response(res, 200, result, null)
      })
  }
}

module.exports = transaction
