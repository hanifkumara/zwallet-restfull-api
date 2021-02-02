const { countTransaction, countIncome } = require('../models/transaction')
const { countUsers, countAllUsers } = require('../models/users')

exports.pagination = async (myId, limit, page) => {
  const users = await countUsers(myId)
  console.log('iki opo broo',users)
  const totalData = users[0].totalData
  const totalPage = Math.ceil(totalData / limit)
  const setPagination = {
    totalData,
    totalPage,
    currentPage: page,
    perPage: limit,
    prevPage: page > 1 ? `${process.env.BASE_URL}/v1/users?page=${page - 1}&limit=${limit}` : null,
    nextPage: page < totalPage ? `${process.env.BASE_URL}/v1/users?page=${page + 1}&limit=${limit}` : null
  }
  return setPagination
}

exports.paginationAllUsers = async (limit, page) => {
  const users = await countAllUsers()
  const totalData = users[0].totalData
  const totalPage = Math.ceil(totalData / limit)
  const setPagination = {
    totalData,
    totalPage,
    currentPage: page,
    perPage: limit,
    prevPage: page > 1 ? `${process.env.BASE_URL}/v1/users?page=${page - 1}&limit=${limit}` : null,
    nextPage: page < totalPage ? `${process.env.BASE_URL}/v1/users?page=${page + 1}&limit=${limit}` : null
  }
  return setPagination
}

exports.paginationTransaction = async (limit, page, myId) => {
  const transaction = await countTransaction(myId)
  const totalData = transaction[0].totalData
  console.log('total data transaction', totalData)
  const totalPage = Math.ceil(totalData / limit)
  const setPagination = {
    totalData,
    totalPage,
    currentPage: page,
    perPage: limit,
    prevPage: page > 1 ? `${process.env.BASE_URL}/v1/transaction/idSender?page=${page - 1}` : null,
    nextPage: page < totalPage ? `${process.env.BASE_URL}/v1/transaction/idSender?page=${page + 1}` : null
  }
  return setPagination
}

exports.paginationIncome = async (limit, page, myId, name) => {
  const income = await countIncome(myId, name)
  const totalData = income[0].totalData
  console.log('total data income', totalData)
  const totalPage = Math.ceil(totalData / limit)
  const setPagination = {
    totalData,
    totalPage,
    currentPage: page,
    perPage: limit,
    prevPage: page > 1 ? `${process.env.BASE_URL}/v1/transaction/income?page=${page - 1}` : null,
    nextPage: page < totalPage ? `${process.env.BASE_URL}/v1/transaction/income?page=${page + 1}` : null
  }
  return setPagination
}