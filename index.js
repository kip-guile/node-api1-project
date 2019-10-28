// implement your API here
const express = require('express')
const cors = require('cors')

const db = require('./data/db')

const server = express()

server.use(cors())
server.use(express.json())

server.get('/api/users', getAllUsers)
server.get('*', handleDefaultrequest)

function getAllUsers(req, res) {
    db.find()
    .then(data => {
        console.log(data);
        res.status(200).json(data)
    })
    .catch(error => {
        console.log(error)
    })
}

function handleDefaultrequest(req, res) {
    res.json('hello world')
}

server.listen(process.env.port || 3000, () => {
    console.log('Listening to ' + (process.env.port || 3000))
})