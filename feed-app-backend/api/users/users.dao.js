var mongoose = require('mongoose')
var usersSchema = require('./users.model')

usersSchema.statics = {
  create: function (data, cb) {
    var user = new this(data)
    user.save(cb)
  },
  get: function (query, cb) {
    this.find(query, cb)
  }
}

var usersModel = mongoose.model('Users', usersSchema)
module.exports = usersModel
