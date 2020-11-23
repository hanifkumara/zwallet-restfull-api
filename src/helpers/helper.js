module.exports = {
  response: (res, status, result, err, pagination = null) => {
    const resultPrint = {}
    resultPrint.status = 'success'
    resultPrint.statusCode = status
    resultPrint.result = result
    resultPrint.err = err
    resultPrint.pagination = pagination
    return res.status(resultPrint.statusCode).json(resultPrint)
  }
}
