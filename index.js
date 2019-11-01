// implement your API here
const express = require('express')
const cors = require('cors')

const db = require('./data/db')

const server = express()

server.use(cors())
server.use(express.json())


server.put('/api/users/:id', updateUser)
server.get('/api/users/:id', findUser)
server.delete('/api/users/:id', deleteUser)
server.post('/api/users', addUser)
server.get('/api/users', getAllUsers)
server.get('*', handleDefaultrequest)


function updateUser(req, res) {
    const {id} = req.params;

    const userUpdate = {
        name: req.body.name,
        bio: req.body.bio
    }

    if (!userUpdate) {
        res
            .status(400)
            .json({errorMessage: "Please provide name and bio for the user."})
    } else {
        db.update(id, userUpdate)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({
                    errorMessage: "The user with the specified ID does not exist."
                })
            }
        })
        .catch(() => {
            res.status(500).json({
                errorMessage: "The user information could not be modified."
            })
        })
    }
}

function findUser(req, res) {
    const {id} = req.params;

    db.findById(id)
    .then(data => {
        if (data) {
            res.status(200).json(data) 
        } else {
            res.status(404).json({errorMessage: "The user with the specified ID does not exist."})
        }
    })
    .catch(error => {
        console.log(error)
    })
}

function deleteUser(req, res) {
    const {id} = req.params;

    db.remove(id)
    .then(data => {
        if (!data) {
            res.status(404).json({errorMessage: "The user with the specified ID does not exist."})
        }
    })
    .catch(() => {
        res.status(500).json({errorMessage: "The user could not be removed"})
    })
}

function addUser(req, res) {
    const user = {
        name: req.body.name,
        bio: req.body.bio
    }

    if (!user) {
        res
            .status(400)
            .json({errorMessage: 'Pleas provide name and bio for the user'})
    } else {
        db.insert(user)
        .then(data => {
            res.status(201).json(user);
        })
        .catch(() => {
            res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
        })
    }
}

function getAllUsers(req, res) {
    db.find()
    .then(data => {
        console.log(data);
        res.status(200).json(data)
    })
    .catch(() => {
        res.status(500).json({errorMessage: "The users information could not be retrieved."})
    })
}

function handleDefaultrequest(req, res) {
    res.json('hello world')
}

server.listen(process.env.port || 3000, () => {
    console.log('Listening to ' + (process.env.port || 3000))
})