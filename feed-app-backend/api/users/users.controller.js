var Users = require('./users.dao')
var bcrypt = require('bcrypt')

// use async await to avoid the callback hell

exports.registerUser = function (req, res, next) {
  var body = req.body

  Users.get({ userName: body.userName }, function (err, users) {
    if (err) {
      return res.json({
        error: err
      })
    } else {
      if (users.length >= 1) {
        return res.status(409).json({
          message: 'User already exists'
        })
      } else {
        // If user doesn't already exists, we go ahead and generate a new user
        bcrypt.hash(body.password, 10, (err, hash) => {
          if (err) {
            console.log(err)
            return res.status(500).json({
              error: err
            })
          } else {
            Users.create({
              userName: body.userName,
              firstName: body.firstName,
              lastName: body.lastName,
              password: hash
            }, function (err, user) {
              if (err) {
                return res.json({
                  error: err
                })
              } else {
                return res.status(201).json({
                  message: 'User created successfully'
                })
              }
            })
          }
        })
      }
    }
  })

}

exports.userSignin = function (req, res, next) {
  Users.get({ userName: req.body.userName }, function (err, users) {
    if (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    } else {
      if (users.length < 1) {
        // 401 means unauthorized
        return res.status(401).json({
          message: 'Auth failed'
        })
      }
      bcrypt.compare(req.body.password, users[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed'
          })
        }
        if (result) {
          return res.status(200).json({
            message: 'Auth successful',
            user: {
              userName: users[0].userName,
              firstName: users[0].firstName,
              lastName: users[0].lastName
            }
          })
        }
        res.status(401).json({
          message: 'Auth failed'
        })
      })
    }
  })
}

exports.getAllUsers = function (req, res, next) {
  Users.get({}, function (err, users) {
    if (err) {
      res.json({
        error: err
      })
    } else {
      res.json({
        users: users
      })
    }
  })
}
