const express = require('express');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT
    this.paths = {
      auth: '/api/v1/auth',
      users: '/api/v1/users'
    }
    this.routes()

  }

  routes() {
    this.app.use(this.paths.auth, require('./routes/auth.routes'))
    this.app.use(this.paths.users, require('./routes/users.routes'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en el puerto', this.port)
    })
  }
}

module.exports = Server