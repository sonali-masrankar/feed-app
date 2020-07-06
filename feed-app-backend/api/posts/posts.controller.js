var Posts = require('./posts.dao')
var config = require('../../config/properties')
exports.createPost = function (req, res, next) {
  var body = req.body
  var postId = Math.floor(Math.random() * 1000000000)
  var userName = req.params.userName
  var post = {
    postId: postId,
    userName: userName,
    text: body.text,
    type: 'text'
  }

  Posts.create(post, function (err, result) {
    if (err) {
      res.json({
        error: err
      })
    } else {
      res.status(200).json({
        message: 'Post created successfully'
      })
    }
  })
}
/*
req.file =
{
  fieldname: 'file',
  originalname: '1. File Name.mp4',
  encoding: '7bit',
  mimetype: 'video/mp4',
  destination: 'media/uploads/',
  filename: '1._Module_Introduction.mp4',
  path: 'media/uploads/1._File_Name.mp4',
  size: 1078934
}
*/
exports.filePost = function (req, res, next) {
  const postId = Math.floor(Math.random() * 1000000000)
  const userName = req.params.userName
  const file = req.file
  const post = {
    postId: postId,
    userName: userName
  }
  if (file.mimetype.includes('video')) {
    post.type = 'video'
  } else if (file.mimetype.includes('image')) {
    post.type = 'image'
  } else {
    return res.status(400).json({
      message: 'Unsupported file type'
    })
  }
  post.fileUrl = config.serverUrl + '/api/media/' + req.file.filename.replace(/ /g, '_')
  post.fileName = req.file.filename
  Posts.create(post, function (err, result) {
    if (err) {
      res.status(500).json({
        error: err
      })
    } else {
      res.status(200).json({
        message: 'Post created successfully'
      })
    }
  })
}

exports.getAllPosts = function (req, res, next) {
  Posts.get({}, function (err, posts) {
    if (err) {
      res.json({
        error: err
      })
    } else {
      res.json({
        posts: posts
      })
    }
  })
}

exports.getPostsByUserName = function (req, res, next) {
  Posts.get({ userName: req.params.userName }, function (err, posts) {
    if (err) {
      res.json({
        error: err
      })
    } else {
      res.json({
        posts: posts
      })
    }
  })
}

exports.addCommentToPost = function (req, res, next) {
  var fetchedPost
  Posts.get({ postId: req.body.postId }, function (err, posts) {
    if (err) {
      res.json({
        error: err
      })
    } else {
      fetchedPost = posts[0]
      if (fetchedPost) {
        var commentId = Math.floor(Math.random() * 1000000000)
        fetchedPost.comments.push({
          commentId: commentId,
          text: req.body.text
        })
        Posts.update({ _id: fetchedPost._id }, fetchedPost, function (err, post) {
          if (err) {
            res.json({
              error: err
            })
          } else {
            res.json({
              message: 'Comment updated successfully'
            })
          }
        })
      } else {
        res.json({
          error: 'Could not find the post'
        })
      }
    }
  })
}

exports.removePost = function (req, res, next) {
  Posts.delete({ postId: req.params.postId }, function (err, post) {
    if (err) {
      res.json({
        error: err
      })
    } else {
      res.json({
        message: 'Post deleted successfully'
      })
    }
  })
}
