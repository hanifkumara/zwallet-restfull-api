module.exports = {
  response: (res, status, result, err) => {
    const resultPrint = {}
    resultPrint.status = 'success'
    resultPrint.statusCode = status
    resultPrint.result = result
    resultPrint.err = err
    return res.status(resultPrint.statusCode).json(resultPrint)
  }
}
