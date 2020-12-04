require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const PORT = process.env.PORT
const helper = require('./src/helpers/helper')
const cors = require('cors')
const routes = require('./src/router/index')
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

app.use('/v1', routes)
app.use('/upload', express.static('./image'))

app.use('*', (req, res, next) => {
  const error = new Error('URL Not Found')
  error.status = 400
  return next(error)
})

app.use((err, req, res, next) => {
  helper.response(res, err.status = 500, null, { message: err.message })
})
app.listen(PORT, () => console.log(`Server running in port ${PORT}`))
