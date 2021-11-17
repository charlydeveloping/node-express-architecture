const AuthService = require("../../services/auth.services");
const UserService = require("../../services/user.services");
const asyncHandler = require("../middlewares/async");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const token = await AuthService.login(email, password);
  res.status(200).json({
    token,
  });
});

const logout = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "ok",
  });
});

const me = asyncHandler(async (req, res) => {
  const { uuid } = req.user;
  const user = await UserService.getOneUserByUUID(uuid);
  res.status(200).json({
    user,
  });
});

module.exports = {
  login,
  logout,
  me,
};
