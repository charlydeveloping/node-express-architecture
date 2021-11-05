const AuthService = require("../../services/auth.services")

const login = async (req, res) => {
  const { email, password } = req.body

  const token = await AuthService.login(email, password)
  res.send(200).json({
    token
  })
}

module.exports = {
  login
}