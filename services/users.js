/*
TODO:
Create the methods for the routes to interact with:
READ
CREATE
UPDATE
DELETE

*/
const uuid = require('uuid/v4')
const validationService = require('./validation')

const usersService = {
  find: (usersStore, id = null) => {
    if (id) {
      const user = usersStore.find((user) => {
        return user.id === id
      })

      if (!user) {
        return Promise.reject({ errors: [`No user for id: ${id}`] })
      }
      return Promise.resolve(user)
    }
    return Promise.resolve(usersStore)
  },
  create: (usersStore, user) => {
    const validUser = validationService.validate(user)

    if (!validUser.isValid) {
      return Promise.reject({ errors: validUser.errors })
    }
    user.id = uuid()
    user.created = Date.now()

    usersStore.push(user)
    return Promise.resolve(user.id)
  },
  update: (usersStore, id, data) => {
    const currentUser = usersStore.find((user) => {
      return user.id === id
    })

    if (!currentUser) {
      return Promise.reject({ errors: ['No user found'] })
    }

    const validUser = validationService.validate(data)

    if (!validUser.isValid) {
      return Promise.reject({ errors: validUser.errors })
    }

    const user = Object.assign(currentUser, data)
    const newUsersStore = usersStore.filter((user) => {
      return user.id !== id
    })
    newUsersStore.push(user)
    return Promise.resolve(user.id)
  },
  delete: (usersStore, id) => {
    const newUsersStore = usersStore.filter((user) => {
      return user.id !== id
    })
    return Promise.resolve(newUsersStore)
  }
}

module.exports = usersService
