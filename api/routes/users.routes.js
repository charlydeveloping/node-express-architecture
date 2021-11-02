const { Router } = require('express')

const router = Router()
const userController = require('../controllers/user.controller')

router.get('/getallusers', userController.getAllUsers)
router.get('/getoneuser/:id', userController.getOneUser)

router.post('/createuser', userController.createUser)

router.put('/updateuser/:id', userController.updateUser)

module.exports = router