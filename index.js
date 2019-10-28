// implement your API here
const express = require('express')
const cors = require('cors')

const db = require('./data/db')

const server = express()

server.use(cors())
server.use(express.json())


server.delete('/api/users/:id', deleteUser)
server.post('/api/users', addUser)
server.get('/api/users', getAllUsers)
server.get('*', handleDefaultrequest)

function deleteUser(req, res) {
    const {id} = req.params;

    db.remove(id)
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.log(error)
    })
}

function addUser(req, res) {
    const user = {
        name: req.body.name,
        bio: req.body.bio
    }

    db.insert(user)
    .then(data => {
        console.log(data)
        res.status(201).json(data)
    })
    .catch(error => {
        console.log(error)
    })
}

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