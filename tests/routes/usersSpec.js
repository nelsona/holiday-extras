const superagent = require('supertest')
const express = require('express')
const test = require('tape')
const app = require('../../app')

test('Call to create a user', (t) => {
  superagent(app)
    .post('/users')
    .send({ "forename": "john", "surname": "smith", "email": "test@test.com" })
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      t.error(err, 'No error')
      t.false(res.body.error, 'User created')
      t.end()
    })
})

test('Call to get users', (t) => {
  const parentApp = express()
  parentApp.use((req, res, next) => {
    req.session = {}
    next()
  })
  parentApp.get('/users', (req, res, next) => {
    req.session.users = [{"forename": "john", "surname": "smith", "email": "test@test.com", "id": "7df177d1-dd35-460b-8fd7-c1ccd53e9e74"}]
    next()
  })
  parentApp.use(app)
  superagent(parentApp)
    .get('/users')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      t.error(err, 'No error')
      t.false(res.body.error, 'User array returned')
      t.true(res.body.users.length === 1, 'User array returned with a single user')
      t.end()
    })
})

test('Call to get user', (t) => {
  const parentApp = express()
  parentApp.use((req, res, next) => {
    req.session = {}
    next()
  })
  parentApp.get('/users/:id', (req, res, next) => {
    req.session.users = [{"forename": "john", "surname": "smith", "email": "test@test.com", "id": "7df177d1-dd35-460b-8fd7-c1ccd53e9e74"}]
    next()
  })
  parentApp.use(app)
  superagent(parentApp)
    .get(`/users/7df177d1-dd35-460b-8fd7-c1ccd53e9e74`)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      t.error(err, 'No error')
      t.false(res.body.error, 'Got user')
      t.end()
    })
})

test('Call to update user', (t) => {
  const parentApp = express()
  parentApp.use((req, res, next) => {
    req.session = {}
    next()
  })
  parentApp.put('/users/:id', (req, res, next) => {
    req.session.users = [{"forename": "john", "surname": "smith", "email": "test@test.com", "id": "7df177d1-dd35-460b-8fd7-c1ccd53e9e74"}]
    next()
  })
  parentApp.use(app)
  superagent(parentApp)
    .put(`/users/7df177d1-dd35-460b-8fd7-c1ccd53e9e74`)
    .send({ "forename": "james", "surname": "smith", "email": "test@test.com" })
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      t.error(err, 'No error')
      t.false(res.body.error, 'Updated user')
      t.end()
    })
})

test('Call to delete user', (t) => {
  const parentApp = express()
  parentApp.use((req, res, next) => {
    req.session = {}
    next()
  })
  parentApp.delete('/users/:id', (req, res, next) => {
    req.session.users = [{"forename": "john", "surname": "smith", "email": "test@test.com", "id": "7df177d1-dd35-460b-8fd7-c1ccd53e9e74"}]
    next()
  })
  parentApp.use(app)
  superagent(parentApp)
    .delete(`/users/7df177d1-dd35-460b-8fd7-c1ccd53e9e74`)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      t.error(err, 'No error')
      t.false(res.body.error, 'Deleted user')
      t.end()
    })
})

