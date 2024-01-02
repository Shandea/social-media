const mongoose = require('mongoose')
const User = require("../models/User.model")
const Schema = mongoose.Schema



const ImageSchema = new Schema({
    image: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    userName: String,
    type: String
}, { timestamps: true })


const Image = mongoose.model("Image", ImageSchema)

module.exports = Image

