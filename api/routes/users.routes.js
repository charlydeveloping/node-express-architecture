const { Router } = require('express')

const router = Router()
const { index, show, store, update, destroy } = require('../controllers/user.controller')

router.get('/', index)
router.get('/:id', show)
router.post('/', store)
router.put('/', update)
router.delete('/:id', destroy)

module.exports = router