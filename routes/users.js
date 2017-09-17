/*
Available routes:
GET /users/ - return a list of users
GET /users/:id - return a single user
POST /users/ - create a new user
PUT /users/:id  - update an existing user
DELETE /users/:id - delete an existing user
If there is time then a simple SEARCH route would be good GET /users/?forename=xyz&surname=abc kind of thing.
 */
const express = require('express')
const router = express.Router()

const usersService = require('../services/users')

router
  .use((req, res, next) => {
    if (!req.session.users) {
      req.session.users = []
    }
    next()
  })
  .get('/', (req, res) => {
    usersService.find(req.session.users)
      .then((users) => {
        res.json({ error: false, users })
      })
      .catch((err) => {
        res.json({ error: true, errors: err.errors })
      })
  })
  .get('/:id', (req, res) => {
    usersService.find(req.session.users, req.params.id)
      .then((user) => {
        res.json({ error: false, user })
      })
      .catch((err) => {
        res.json({ error: true, errors: err.errors })
      })
  })
  .post('/', (req, res) => {
    usersService.create(req.session.users, req.body)
      .then((userId) => {
        res.json({ error: false, userId: userId })
      })
      .catch((err) => {
        res.json({ error: true, errors: err.errors })
      })
  })
  .put('/:id', (req, res) => {
    usersService.update(req.session.users, req.params.id, req.body)
      .then(() => {
        res.json({ error: false, userId: req.params.id })
      })
      .catch((err) => {
        res.json({ error: true, errors: err.errors })
      })
  })
  .delete('/:id', (req, res) => {
    usersService.delete(req.session.users, req.params.id)
      .then((newUsersStore) => {
        req.session.users = newUsersStore
        res.json({ error: false, userId: req.params.id })
      })
      .catch((err) => {
        res.json({ error: true, errors: err.errors })
      })
  })

module.exports = router
