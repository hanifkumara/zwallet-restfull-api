const { json } = require('express')
const transactionModel = require('../models/transaction')
const helper = require('../helpers/helper')

const transaction = {
    getTransaction: (req, res) => {
        transactionModel.getTransaction()
        .then(result =>{
            const resultTransaction = result
            // res.json(resultTransaction)
            helper.response(res, 200, resultTransaction , null)
        })
        .catch (e => console.log(e.message))
    },
    getTransactionById: (req,res) => {
        const id = req.params.id
        transactionModel.getTransactionById(id)
            .then(result => {
                const resultTransactionById = result
                helper.response(res, 200, resultTransactionById, null)
            })
            .catch(e => console.log(e.message))
    },
    addTranaction: (req, res) => {
        const {amountTransfer, notes,transactionStatus} = req.body

        const data = {
            amountTransfer,
            notes,
            transactionStatus,
            createdAt : new Date(),
            updatedAt : new Date()
        }
        transactionModel.addTransaction(data)
            .then(result => {
                const resultAdd = result
                helper.response(res, 200, resultAdd, null)
            })
            .catch(e => console.log(e.message))
    },
    updateTransaction: (req,res) => {
        const id = req.params.id
        const {amountTransfer ,notes,transactionStatus} = req.body
        const data = {}
        if (amountTransfer) {
            data.amountTransfer = req.body.amountTransfer
        }
        if (notes) {
            data.notes = req.body.notes
        }
        if (transactionStatus) {
            data.transactionStatus = req.body.transactionStatus
        }
        transactionModel.updateTransaction(id, data)
            .then(result => {
                const resultUpdate = result
                res.json(resultUpdate)
            })
            .catch(e => console.log(e.message))
    },
    deleteTransaction: (req,res) => {
        const id = req.params.id 
        transactionModel.deleteTransaction(id)
            .then(result => {
                const resultDelete = result
                res.json(resultDelete)
            })
    }
}

module.exports = transaction