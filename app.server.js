const express = require('express')
const errorHandler = require('./helpers/error-handler')
const cors = require('cors')

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT
    this.paths = {
      auth: '/api/v1/auth',
      users: '/api/v1/users'
    }
    this.middlewares()
    this.routes()
    this.app.use(errorHandler)

  }

  routes() {
    this.app.use(this.paths.auth, require('./api/routes/auth.routes'))
    this.app.use(this.paths.users, require('./api/routes/users.routes'))
  }

  middlewares() {
    // Lectura y parseo del body
    this.app.use(express.json())

    this.app.use(cors())
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en el puerto', this.port)
    })
  }
}

module.exports = Server