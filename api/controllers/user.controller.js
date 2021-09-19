'use strict';
const User = require('../../models').user;
const UserService = require('../../services/user.services')

/**
 * Obtiene el listado de usuarios.
 * @route GET /api/v1/user
 * @author Carlos Ramirez <charlydeveloping@gmail.com>
 * @access Private/Admin
 * @version 1.0.0
 * @param {Request} req - Request of the api.
 * @param {Response} res - Response of the api.
 */
const index = async (req, res) => {
    const service = new UserService()
    const users = service.index()
    return res.status(200).json(users)
};
/**
 * Obtiene el un usuario por id
 * @route GET /api/v1/user/:id
 * @author Carlos Ramirez <charlydeveloping@gmail.com>
 * @access Private/Admin
 * @version 1.0.0
 * @param {Request} req - Request of the api.
 * @param {Response} res - Response of the api.
 */
const show = async (req, res) => {
    const id = req.param("id");
    
    const user = await User.findOne({
        where: { id: id }, 
    })
    if ( !user ) {
        return res.status(400).json({msg: 'user not found'})
    }
    return res.status(200).send(user)
}
/**
 * Guarda una nueva instancia de usuario
 * @route POST /api/v1/user
 * @author Carlos Ramirez <charlydeveloping@gmail.com>
 * @access Private/Admin
 * @version 1.0.0
 * @param {Request} req - Request of the api.
 * @param {Response} res - Response of the api.
 */
const store = async (req, res) => {
    const { first_name, last_name, email, phone, password, status } = req.body; 
    const user = await User.create({
        first_name,
        last_name,
        email,
        phone,
        password,
        status
    });
    return res.status(200).json(user);
}
/**
 * Actualiza la información de un usuario existente
 * @route PUT /api/v1/user/:id
 * @author Carlos Ramirez <charlydeveloping@gmail.com>
 * @access Private/Admin
 * @version 1.0.0
 * @param {Request} req - Request of the api.
 * @param {Response} res - Response of the api.
 */
const update = async (req, res) => {
    const id = req.param("id");
    const { name, email, phone, password } = req.body;
    const user = await User.findOne({ 
        where: {
            id: id
        } 
    });
    if( !user ) {
        return res.status(404).json({msg: 'user not found'})
    }
    await user.update({
        name,
        email,
        phone,
        password
    });   
    return res.status(200).json(user);
}
/**
 * Elimina la instancia de un usuario de manera lógica
 * @route DELETE /api/v1/user/:id
 * @author Carlos Ramirez <charlydeveloping@gmail.com>
 * @access Private/Admin
 * @version 1.0.0
 * @param {Request} req - Request of the api.
 * @param {Response} res - Response of the api.
 */
const destroy = async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({
        where: {
            id
        }
    });
    if( !user ) {
      return res.status(404).json({msg: 'user not found'})
    }
    await user.destroy();
    await user.update({
        deleted_by: req.user.id
    });
    return res.status(204).send({})
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}