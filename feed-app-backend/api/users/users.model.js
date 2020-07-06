var mongoose = require('mongoose')
var Schema = mongoose.Schema
var usersSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = usersSchema
