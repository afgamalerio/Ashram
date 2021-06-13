const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()


app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors())
app.use(require('./src/routes'))

app.use(express.static(path.join(__dirname, './src')))
app.use('/', express.static(path.join(__dirname, './src/index.html')))

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`App listen on port ${port}`))
