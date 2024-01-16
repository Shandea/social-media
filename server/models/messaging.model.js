const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Messages = mongoose.model("Messages", new Schema({
    queryId: String,
    sender: Schema.Types.ObjectId,
    senderName: String,
    recipient: Schema.Types.ObjectId,
    messageContent: String,
    read: [String],
    deleted: [String],
    profileImg: String,
}, { timestamps: true }
))

module.exports = Messages