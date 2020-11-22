require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const PORT = process.env.PORT
const helper = require('./src/helpers/helper')
const cors = require('cors')
const routeTransaction = require('./src/router/transaction')
const routeUsers = require('./src/router/users')
const routeHistory = require('./src/router/history')
const bodyParser = require('body-parser')

const mymiddleware = (req, res, next) => {
  console.log('Check Auth')
  next()
}

app.use(cors())

app.use(morgan('dev'))

app.use(mymiddleware)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/users', routeUsers)
app.use('/transaction', routeTransaction)
app.use('/history', routeHistory)
// app.use((err, req, res, next) => {
//     helper.response(res, err.status, null, {message: err.message})
// })

app.use('*', (req, res) => {
  helper.response(res, 404, null, { message: 'URL not found' })
})

app.listen(PORT, () => console.log(`Server running in port ${PORT}`))
