const { Router } = require('express')
const { validateJwt } = require('../middlewares/validate-jwt.middleware')

const router = Router()
const { login, me } = require('../controllers/auth.controller')

router.get('/me', validateJwt, me)
router.post('/login', login)

module.exports = router