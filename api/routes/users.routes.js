const { Router } = require('express')

const router = Router()
const userController = require('../controllers/user.controller')

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getOneUser)
router.post('/', userController.createUser)
router.put('/', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router