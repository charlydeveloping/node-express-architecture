"use strict"
const User = require("../../models").user
const UserService = require("../../services/user.services")
const asyncHandler = require('../middlewares/async')
/**
 * @description gets the list of users
 * @route GET /api/v1/users/getallusers
 * @author Carlos Ramirez <charlydeveloping@gmail.com>
 * @version 1.0.0
 * @param {Request} req - Request of the api.
 * @param {Response} res - Response of the api.
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserService.getAllUsers()
  return res.status(200).json({
    success: true,
    message: "Los usuarios han sido obtenidos exitosamente.",
    data: users
  })
})
/**
 * @description gets one user by its id
 * @route GET /api/v1/users/:id/getoneuser
 * @author Carlos Ramirez <charlydeveloping@gmail.com>
 * @version 1.0.0
 * @param {Request} req - Request of the api.
 * @param {Response} res - Response of the api.
 */
const getOneUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await UserService.getOneUser(id);

  if (!user)
    return res.status(404).json({
      success: true,
      message: "User not found",
      data: plans,
    })

  return res.status(200).send({
    success: true,
    message: "Los usuarios han sido obtenidos exitosamente.",
    data: user
  });
})
/**
 * @description creates a register of user
 * @route POST /api/v1/users/createuser
 * @author Carlos Ramirez <charlydeveloping@gmail.com>
 * @version 1.0.0
 * @param {Request} req - Request of the api.
 * @param {Response} res - Response of the api.
 */
const createUser = asyncHandler(async (req, res) => {
  const payload = req.body
  const user = await User.create({
    first_name: payload.first_name,
    last_name: payload.last_name,
    email: payload.email,
    phone: payload.phone,
    password: payload.password,
    status: payload.status,
    created_by: 1,
    updated_by: 1
  })
  return res.status(200).json({
    success: true,
    message: "User created successfully.",
    data: user,
  })
})
/**
 * @description updates a register of user
 * @route PUT /api/v1/users/updateuser
 * @author Carlos Ramirez <charlydeveloping@gmail.com>
 * @version 1.0.0
 * @param {Request} req - Request of the api.
 * @param {Response} res - Response of the api.
 */
const updateUser = asyncHandler(async (req, res) => {

  const payload = req.body

  const user = await UserService.updateUser({
		id: req.params.id,
		first_name: payload.first_name,
		last_name: payload.last_name,
		email: payload.email,
		phone: payload.phone,
		password: payload.password,
		status: payload.status
	})

  if (!user) {
    return res.status(404).json({
      success: true,
      message: "User not found.",
    })
  }

  return res.status(200).json({
    success: true,
    message: "User updated successfully.",
    data: user,
  })
})


module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
}
