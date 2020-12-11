const { countTransaction } = require('../models/transaction')
const { countUsers } = require('../models/users')

exports.pagination = async (limit, page) => {
  const users = await countUsers()
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
