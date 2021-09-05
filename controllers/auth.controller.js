const AuthService = require("../services/auth.service")

const signIn = (req, res) => {
  const { email, password } = req.body

  const user = AuthService.signIn(email, password)
  res.send(200).json({
    user
  })
}

module.exports = {
  signIn
}