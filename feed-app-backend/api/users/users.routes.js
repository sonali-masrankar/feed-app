
var Users = require('./users.controller')

module.exports = function (router) {
  router.post('/users/create', Users.registerUser)
  router.post('/users/signin', Users.userSignin)
  router.get('/users/get', Users.getAllUsers)
}
