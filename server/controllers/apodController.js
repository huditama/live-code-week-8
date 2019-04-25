const Apod = require('../models/apod')

class apodController {
    static create(req, res) {
        const { date } = req.body
        const { id } = req.authenticatedUser
        Apod
            .create({ date, UserId: id })
            .then((createdApod) => { res.status(201).json({ message: 'Saved an Apod!', createdApod }) })
            .catch((err) => { res.status(500).json(err) })
    }

    static findUserApods(req, res) {
        const { id } = req.authenticatedUser
        Apod
            .find({ UserId: id })
            .then((userApods) => { res.status(200).json(userApods) })
            .catch((err) => { res.status(500).json(err) })
    }

    static findOne(req, res) {
        const { id } = req.params
        Apod
            .findById(id)
            .then((findOneApod) => { res.status(200).json(findOneApod) })
            .catch((err) => { res.status(500).json(err) })
    }

    static delete(req, res) {
        const { id } = req.params
        Apod
            .findByIdAndDelete(id)
            .then((deletedApod) => { res.status(200).json({ message: 'Deleted apod!', deletedApod }) })
            .catch((err) => { res.status(500).json(err) })
    }

    // HANYA BISA UPDATE TANGGAL SAJA :(
    static update(req, res) {
        const { date } = req.body
        const { id } = req.params
        Apod
            .findOneAndUpdate({ _id: id }, { date }, { new: true })
            .then((updatedApod) => { res.status(200).json({ message: 'Updated Apod!', updatedApod }) })
            .catch((err) => {
                res.status(500).json(err)
            })
    }
    // ----------------------------------------

}

module.exports = apodController