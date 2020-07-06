var express = require('express')
var properties = require('./config/properties')
var db = require('./config/database')
var app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')
var cors = require('cors')
// add routes
var postsRoutes = require('./api/posts/posts.routes')
var usersRoutes = require('./api/users/users.routes')

// initialise express router
var router = express.Router()

// call the database connectivity function
db()

// configure app
app.use(morgan('dev'))

app.use(cors()) // It ensures that we prevent Cross-Origin Resource Sharing(CORS) errors
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// use express router
app.use('/api', router)
postsRoutes(router)
usersRoutes(router)
app.use('/api/media', express.static('media/uploads'))

app.listen(properties.PORT, (req, res) => {
  console.log(`Server is running on ${properties.PORT} port.`)
})
