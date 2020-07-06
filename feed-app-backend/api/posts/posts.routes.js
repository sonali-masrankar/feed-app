
var Posts = require('./posts.controller')
var multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'media/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/ /g, '_'))
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50 // 50 MB
  }
})

module.exports = function (router) {
  router.post('/posts/upload/:userName', upload.single('file'), Posts.filePost)
  router.post('/posts/create/:userName', Posts.createPost)
  router.get('/posts/get', Posts.getAllPosts)
  router.get('/posts/get/:userName', Posts.getPostsByUserName)
  router.put('/posts/update/comment', Posts.addCommentToPost)
}
