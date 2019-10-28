// implement your API here
const express = require('express')
const cors = require('cors')

const db = require('./data/db')

const server = express()

server.use(cors())
server.use(express.json())

server.get('*', handleDefaultrequest)

function handleDefaultrequest(req, res) {
    res.json('hello world')
}

server.listen(process.env.port || 3000, () => {
    console.log('Listening to' + (process.env.port || 3000))
})