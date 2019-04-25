const express = require('express')
const router = express.Router()
const apodController = require('../../controllers/apodController')
const authenticate = require('../../middlewares/authenticate')
const authorize = require('../../middlewares/authorize')

router.use(authenticate)
router.post('/', apodController.create)
router.get('/', apodController.findUserApods)
router.get('/:id', authorize, apodController.findOne)
router.delete('/:id', authorize, apodController.delete)
router.put('/:id', authorize, apodController.update)

module.exports = router