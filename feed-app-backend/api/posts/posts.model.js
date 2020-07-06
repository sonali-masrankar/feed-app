var mongoose = require('mongoose')
var Schema = mongoose.Schema
var commentsSchema = new Schema({
  commentId: {
    type: Number,
    unique: false,
    required: false
  },
  text: {
    type: String,
    unique: false,
    required: false
  }
}, {
  timestamps: true
})
var postsSchema = new Schema({
  postId: {
    type: Number,
    unique: true,
    required: true,
    index: true
  },
  userName: {
    type: String,
    unique: false,
    required: true
  },
  text: {
    type: String,
    unique: false,
    required: false
  },
  type: {
    type: String,
    unique: false,
    required: true
  },
  fileUrl: {
    type: String,
    unique: false,
    required: false
  },
  fileName: {
    type: String,
    unique: false,
    required: false
  },
  comments: [commentsSchema]
}, {
  timestamps: true
})

module.exports = postsSchema
