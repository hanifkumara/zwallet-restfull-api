const {addTransaction, getTransaction, getTransactionBySender, getTransactionById, deleteTransaction, updateTransaction} = require('../models/transaction')
const helper = require('../helpers/helper')
const createError = require('http-errors')


exports.getTransaction = (req, res, next) => {
  const page = req.query.page || 1
  const limit = req.query.limit || 3
  const offset = (page - 1) * limit
  const sort = req.query.sort || 'DESC'

  getTransaction(sort, limit, offset, myId)
    .then(result => {
      const resultTransaction = result
      // res.json(resultTransaction)
      const pagination = {
        previousPage: page - 1 > 0 ? `${process.env.BASE_URL}/transaction?page=${page - 1}` : null,
        currentPage: `${process.env.BASE_URL}/transaction?page=${page}`,
        nextPage: parseInt(page) + 1 > limit ? null : `${process.env.BASE_URL}/transaction?page=${parseInt(page) + 1}`
      }
      helper.response(res, 200, resultTransaction, null, pagination)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
  }
exports.getTransactionBySender = (req, res, next) => {
    const { myId } = req
    console.log(myId)
    const id = req.params.id
    const page = req.query.page || 1
    const limit = req.query.limit || 4
    const offset = (page - 1) * limit
    getTransactionBySender(id, limit, offset)
      .then(result => {
        console.log(result)
        if (result.length === 0) {
          return helper.response(res, 404, null, { message: 'id not found' })
        } 
        const pagination = {
          previousPage: page - 1 > 0 ? `${process.env.BASE_URL}/transaction?page=${page - 1}` : null,
          currentPage: `${process.env.BASE_URL}/transaction?page=${page}`,
          nextPage: parseInt(page) + 1 > limit ? null : `${process.env.BASE_URL}/transaction?page=${parseInt(page) + 1}`
        }
        helper.response(res, 200, result, null, pagination)
      })
      .catch(() => {
        const error = createError.InternalServerError()
        return next(error)
      })
}
exports.getTransactionById = (req, res, next) => {
  const id = req.params.id
  getTransactionById(id)
    .then(result => {
      console.log(result)
      if (result.length === 0) {
        return helper.response(res, 404, null, { message: 'id not found' })
      } 
      helper.response(res, 200, result, null)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}
exports.addTranaction = (req, res, next) => {
  const { amountTransfer, notes, userSenderId, userReceiverId } = req.body

  const data = {
    amountTransfer,
    notes,
    userSenderId,
    userReceiverId,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  addTransaction(data)
    .then(result => {
      const resultData = {
        insertId: result.insertId,
        data: { ...data }
      }
      helper.response(res, 200, resultData, null)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}
exports.updateTransaction = (req, res, next) => {
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
  updateTransaction(id, data)
    .then(result => {
      if (result.affectedRows === 0) {
        return helper.response(res, 404, null, { message: 'id not found' })
      }
      helper.response(res, 200, data, null)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}
exports.deleteTransaction  = (req, res, next) => {
  const id = req.params.id
  deleteTransaction(id)
    .then(result => {
      if (result.affectedRows === 0) {
        return helper.response(res, 404, null, { message: 'id not found' })
      }
      helper.response(res, 200, result, null)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}