const test = require('tape')
const validationService = require('../../services/validation')

test('validate valid object', (t) => {
  t.plan(1)
  const expected = { isValid: true, errors: [] }
  const actual = validationService.validate({ forename: 'john', surname: 'smith', email: 'test@test.com' })
  t.deepEqual(actual, expected)
})

test('validate empty object', (t) => {
  t.plan(1)
  const expected = { isValid: false, errors: [ 'forename is a required property', 'surname is a required property', 'email is a required property' ] }
  const actual = validationService.validate({})
  t.deepEqual(actual, expected)
})

test('validate object without forename', (t) => {
  t.plan(1)
  const expected = { isValid: false, errors: [ 'forename is a required property' ] }
  const actual = validationService.validate({ surname: 'smith', email: 'test@test.com' })
  t.deepEqual(actual, expected)
})

test('validate object without surname', (t) => {
  t.plan(1)
  const expected = { isValid: false, errors: [ 'surname is a required property' ] }
  const actual = validationService.validate({ forename: 'john', email: 'test@test.com' })
  t.deepEqual(actual, expected)
})

test('validate object without email', (t) => {
  t.plan(1)
  const expected = { isValid: false, errors: [ 'email is a required property' ] }
  const actual = validationService.validate({ forename: 'john', surname: 'smith' })
  t.deepEqual(actual, expected)
})

test('validate object with invalid email', (t) => {
  t.plan(1)
  const expected = { isValid: false, errors: [ 'email is invalid' ] }
  const actual = validationService.validate({ forename: 'john', surname: 'smith', email: 'test' })
  t.deepEqual(actual, expected)
})
