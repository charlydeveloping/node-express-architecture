"use strict";
const User = require("../../models").user;
const UserService = require("../../services/user.services");

/**
 * @description gets the list of users
 * @route GET /api/v1/users/getallusers
 * @author Carlos Ramirez <charlydeveloping@gmail.com>
 * @version 1.0.0
 * @param {Request} req - Request of the api.
 * @param {Response} res - Response of the api.
 */
const getAllUsers = async (req, res) => {
  const users = UserService.getAllUsers();
  return res.status(200).json(users);
};
/**
 * @description gets one user by its id
 * @route GET /api/v1/users/:id/getoneuser
 * @author Carlos Ramirez <charlydeveloping@gmail.com>
 * @version 1.0.0
 * @param {Request} req - Request of the api.
 * @param {Response} res - Response of the api.
 */
const getOneUser = async (req, res) => {
  const id = req.params.id;

  const user = UserService.getOneUser(id);

  if (!user)
    return res.status(404).json({
      success: true,
      message: "User not found",
      data: plans,
    });

  return res.status(200).send(user);
};
/**
 * @description creates a register of user
 * @route POST /api/v1/users/createuser
 * @author Carlos Ramirez <charlydeveloping@gmail.com>
 * @version 1.0.0
 * @param {Request} req - Request of the api.
 * @param {Response} res - Response of the api.
 */
const createUser = async (req, res) => {
  const user = req.body;
  const user = await User.create({
    first_name,
    last_name,
    email,
    phone,
    password,
    status,
  });
  return res.status(200).json({
    success: true,
    message: "User created successfuly.",
    data: user,
  });
};
/**
 * @description updates a register of user
 * @route PUT /api/v1/users/updateuser
 * @author Carlos Ramirez <charlydeveloping@gmail.com>
 * @version 1.0.0
 * @param {Request} req - Request of the api.
 * @param {Response} res - Response of the api.
 */
const update = async (req, res) => {

  const user = req.body;

  const user = UserService.updateUser({
		id: user.id,
		first_name: user.first_name,
		last_name: user.last_name,
		email: user.email,
		phone: user.phone,
		password: user.password,
		status: user.status
	})

  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }
  await user.update({
    name,
    email,
    phone,
    password,
  });
  return res.status(200).json(user);
};
/**
 * @description Elimina la instancia de un usuario de manera lógica
 * @route DELETE /api/v1/user/:id
 * @author Carlos Ramirez <charlydeveloping@gmail.com>
 * @access Private/Admin
 * @version 1.0.0
 * @param {Request} req - Request of the api.
 * @param {Response} res - Response of the api.
 */
const destroy = async (req, res) => {
  const id = req.params.id;
  
	

  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }
  await user.destroy();
  await user.update({
    deleted_by: req.user.id,
  });
  return res.status(204).send({});
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
