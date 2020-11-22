const historyModel = require('../models/history')
const helper = require('../helpers/helper')

const history = {
  getHistory: (req, res) => {
    historyModel.getHistory()
      .then(result => {
        helper.response(res, 200, result, null)
      })
      .catch(e => console.log(e.message))
  },
  getHistoryById: (req, res) => {
    const id = req.params.id
    historyModel.getHistoryById(id)
      .then(result => {
        if (result.length === 0) {
          return helper.response(res, 404, null, { message: 'id not found' })
        }
        helper.response(res, 200, result, null)
      })
      .catch(e => console.log(e.message))
  }
}

module.exports = history
