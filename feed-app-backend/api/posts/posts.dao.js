var mongoose = require('mongoose')
var postsSchema = require('./posts.model')

postsSchema.statics = {
  create: function (data, cb) {
    var post = new this(data)
    post.save(cb)
  },
  get: function (query, cb) {
    // this.find(query, cb).sort({ updatedAt: -1, 'comments.updatedAt': -1 })
    this.find(query, cb).sort([['updatedAt', -1]])
  },
  update: function (query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb)
  },
  delete: function (query, cb) {
    this.findOneAndDelete(query, cb)
  }
}

var postsModel = mongoose.model('Post', postsSchema)
module.exports = postsModel
