const express = require('express');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.port
    this.paths = {
      auth: '/api/v1/auth'
    }
    this.routes()

  }

  routes() {
    this.app.use(this.paths.auth, require('./routes/auth.routes'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en el puerto', this.port)
    })
  }
}

module.exports = Server