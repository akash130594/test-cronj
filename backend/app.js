require('dotenv').config()
require('./utils/db')
const bodyParser = require('body-parser')
const express = require('express')
const taskRouter = require('./routes/tasks')
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

app.use(taskRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})