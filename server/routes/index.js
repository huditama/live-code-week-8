const express = require('express')
const router = express.Router()
const user = require('./user')
const apod = require('./apod')

router.use('/', user)
router.use('/apods', apod)

module.exports = router