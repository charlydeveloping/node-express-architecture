const { Router } = require('express')

const router = Router()
const { signIn } = require('../controllers/auth.controller')


router.post('/sign-in', signIn)

module.exports = router