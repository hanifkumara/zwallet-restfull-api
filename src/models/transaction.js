const connection = require('../config/db')

const transaction = {
    getTransaction: ()=> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM transaction ORDER BY createdAt DESC' ,(error, result) => {
                if(!error) {
                    resolve(result)
                } else {
                    reject(error)
                } 
            })
        })
    },
    getTransactionById: (id) => {
        return new Promise((resolve,reject) => {
            connection.query('SELECT * FROM transaction WHERE id = ?', id,(error, result) => {
                if (!error) {
                    resolve(result)
                } else {
                    reject(error)
                }
            })
        })
    },
    addTransaction: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO transaction SET ?', data, (error, result) => {
                if (!error) {
                    resolve(result)
                } else {
                    reject(error)
                }
            })
        })
    },
    updateTransaction: (id, data) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE transaction SET ? WHERE id = ?', [data, id], (error, result) => {
                if (!error) {
                    resolve(result)
                } else {
                    reject(error)
                }
            })
        })
    },
    deleteTransaction: (id) => {
        return new Promise((resolve,reject) => {
            connection.query('DELETE FROM transaction WHERE id = ?', id, (error,result) => {
                if (!error) {
                    resolve(result)
                } else {
                    reject(error)
                }
            })
        })
    }
}

module.exports = transaction