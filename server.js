const express = require('express')

const { db } = require('./db')
const taskRoute = require('./routes/task')

const app = express()

const server_port = process.env.PORT || 6543
app.use('/', express.static(__dirname + '/public'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/tasks', taskRoute)

db.sync()
  .then(() => {
    app.listen(server_port)
  })
  .catch((err) => {
    console.error(err)
  })