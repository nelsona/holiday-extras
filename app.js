const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
  secret: 'holiday-extras-test',
  resave: false,
  saveUninitialized: true
}))

const usersRoutes = require('./routes/users')

app.use('/users', usersRoutes)

// Unhandled errors
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Internal error')
})

// Unknown routes
app.use((req, res, next) => {
  res.status(404).send('No route for that url')
})

module.exports = app
