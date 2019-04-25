const { verify } = require('../helpers/jwt')
const Apod = require('../models/apod')

module.exports = (req, res, next) => {
    const decoded = verify(req.headers.token)
    Apod
        .findOne({ _id: req.params.id })
        .then((findOneApod) => {
            if (findOneApod.UserId == decoded.id) next()
            else res.status(401).json({ type: 'AUTHORIZATION ERROR', message: 'You do not have access to this page!' })
        })
}