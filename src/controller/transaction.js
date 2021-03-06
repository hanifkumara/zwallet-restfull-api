const { addTransaction, getTransaction, getTransactionBySender, getTransactionById, deleteTransaction, updateTransaction, incomeModel, totalTransfer, totalIncome } = require('../models/transaction')
const helper = require('../helpers/helper')
const createError = require('http-errors')
const { pagination, paginationTransaction, paginationIncome } = require('../helpers/pagination')

exports.getTransaction = async (req, res, next) => {
  const page = req.query.page || 1
  const limit = req.query.limit || 3
  const offset = (page - 1) * limit
  const setPagination = await pagination(limit, page)
  const sort = req.query.sort || 'DESC'
  getTransaction(sort, limit, offset)
    .then(result => {
      helper.response(res, 200, { result: result, pagination: setPagination}, null)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}
exports.getTransactionBySender = async (req, res, next) => {
  const { myId } = req
  const idTransaction = req.params.idTransaction
  const { name } = req.query
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 4
  const offset = (page - 1) * limit
  const sort = req.query.sort || 'DESC'
  const setPagination = await paginationTransaction(limit, page, myId)
  getTransactionBySender(myId, name, limit, offset, idTransaction, sort)
    .then(result => {
      if (result.length === 0) {
        return helper.response(res, 404, null, { message: 'id not found' })
      }
      helper.response(res, 200, {transaction: result, pagination: setPagination}, null)
    })
    .catch((err) => {
      console.log(err)
      const error = createError.InternalServerError()
      return next(error)
    })
}
exports.getTransactionById = (req, res, next) => {
  const id = req.params.id
  getTransactionById(id)
    .then(result => {
      if (result.length === 0) {
        return helper.response(res, 404, null, { message: 'id not found' })
      }
      helper.response(res, 200, result, null)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
},
exports.summaryTransaction = (req, res, next) => {
  const {myId} = req
  totalTransfer(myId)
    .then(transfer => {
      totalIncome(myId)
        .then(income => {
          let containerTransfer = [0]
          let containerIncome = [0]
          transfer.map(value => {
            containerTransfer.push(value.amountTransfer)
          })
          income.map(value => {
            containerIncome.push(value.amountTransfer)
          })
          const resultTransfer = containerTransfer.reduce((acc, curr) => {
            return acc + curr
          })
          const resultIncome = containerIncome.reduce((acc, curr) => {
            return acc + curr
          })
          return helper.response(res, 200, {resultTransfer, resultIncome}, null)
        })
        .catch(err => {
          console.log(err)
        })
      // console.log('ini result summare', result)
    })
    .catch((err) => {
      console.log(err)
      const error = createError.InternalServerError()
      return next(error)
    })
}
exports.addTranaction = (req, res, next) => {
  const { amountTransfer, notes, userReceiverId } = req.body
  const {myId} = req

  const data = {
    amountTransfer,
    notes,
    userSenderId: myId,
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
      return helper.response(res, 200, resultData, null)
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
exports.deleteTransaction = (req, res, next) => {
  const id = req.params.id
  deleteTransaction(id)
    .then(result => {
      if (result.affectedRows === 0) {
        return helper.response(res, 404, null, { message: 'id not found' })
      }
      helper.response(res, 200, {messgae: 'Delete success!!'}, null)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}
exports.getIncomeTransaction = async (req, res, next) => {
  const {myId} = req
  const { name } = req.query
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 4
  const offset = (page - 1) * limit
  const setPagination = await paginationIncome(limit, page, myId, name)
  incomeModel(myId, name, limit, offset)
    .then((result) => {
      if (result.length === 0) {
        return helper.response(res, 401, null, {message: 'income does not exist'})
      }
      console.log(result)
      return helper.response(res, 200, {result, pagination: setPagination}, null)
    })
    .catch((err) => {
      console.log(err)
      const error = createError.InternalServerError()
      return next(error)
    });
}