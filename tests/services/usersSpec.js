const test = require('blue-tape')
const usersService = require('../../services/users')
const uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

test('create user', (t) => {
  return usersService.create([], { forename: 'john', surname: 'smith', email: 'test@test.com' })
    .then((actual) => {
      t.true(uuidRegex.test(actual))
    })
})

test('update user', (t) => {
  return usersService.update([{ forename: 'john', surname: 'smith', email: 'test@test.com', id: '85534d53-8bbd-49a8-b7ea-5f7e7240787d' }], '85534d53-8bbd-49a8-b7ea-5f7e7240787d', { forename: 'john', surname: 'smith', email: 'johnsmith@test.com' })
    .then((actual) => {
      t.true(uuidRegex.test(actual))
      t.true(actual === '85534d53-8bbd-49a8-b7ea-5f7e7240787d')
    })
})

test('delete user', (t) => {
  return usersService.delete([{ forename: 'john', surname: 'smith', email: 'test@test.com', id: '85534d53-8bbd-49a8-b7ea-5f7e7240787d' }], '85534d53-8bbd-49a8-b7ea-5f7e7240787d')
    .then((actual) => {
      const item = actual.find((user) => {
        return item.id === '85534d53-8bbd-49a8-b7ea-5f7e7240787d'
      })
      t.false(item)
    })
})

test('delete user', (t) => {
  return usersService.delete([{ forename: 'john', surname: 'smith', email: 'test@test.com', id: '85534d53-8bbd-49a8-b7ea-5f7e7240787c' }, { forename: 'john', surname: 'smith', email: 'test@test.com', id: '85534d53-8bbd-49a8-b7ea-5f7e7240787d' }], '85534d53-8bbd-49a8-b7ea-5f7e7240787d')
    .then((actual) => {
      const item = actual.find((user) => {
        return user.id === '85534d53-8bbd-49a8-b7ea-5f7e7240787d'
      })
      t.false(item)
      t.true(actual.length === 1)
    })
})
