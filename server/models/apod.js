const mongoose = require('mongoose')
const Schema = mongoose.Schema
const axios = require('axios')
const api = axios.create({
    baseURL: 'https://api.nasa.gov/planetary'
})

const apodSchema = new Schema({
    date: String,
    title: String,
    desc: String,
    url: {
        type: String,
    },
    mediaType: String,
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

apodSchema.pre('save', function (next) {
    const { date } = this
    api
        .get(`/apod?api_key=${process.env.API_KEY}&date=${date}`)
        .then(({ data }) => {
            const { explanation, media_type, title, url } = data
            this.date = date
            this.title = title
            this.url = url
            this.mediaType = media_type
            this.desc = explanation
            return mongoose.model('Apod', apodSchema)
                .findOne({ url })
        })
        .then((findOneApod) => {
            if (findOneApod) throw new Error('You already have this image!')
            else next()
        })
        .catch((err) => {
            next(err)
        })
})

// HANYA BISA UPDATE TANGGAL SAJA :(
apodSchema.post('findOneAndUpdate', function (next) {
    const { date } = this
    api
        .get(`/apod?api_key=${process.env.API_KEY}&date=${date}`)
        .then(({ data }) => {
            const { explanation, media_type, title, url } = data
            this.date = date
            this.title = title
            this.url = url
            this.mediaType = media_type
            this.desc = explanation
            next()
        })
        .catch((err) => {
            next(err)
        })
})
// ----------------------------------------


const Apod = mongoose.model('Apod', apodSchema)

module.exports = Apod