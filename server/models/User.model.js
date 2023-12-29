const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    phone: Number,
    gender: String,
    age: Number,

    bio: String,
    pronoun: String,
    location: {
        city: String,
        state: String,
        zipcode: String
    },
    secretQuestion: String,
    secretAnswer: String,
    birthDate: {},
    hobbies: [String],

    feeds: [{ type: Schema.Types.ObjectId, ref: 'Feeds' }],
    messages: [{
        queryId: String,
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        messages: [{ type: Schema.Types.ObjectId, ref: 'Messages' }],
        messageCount: Number, // update on read thread to messages.length to show new messages..
        status: String,
        senderName: String,
        profileImg: String,
        recent: String
    }],


    vibe: String,
    isOnline: Boolean,


    friends: [{
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        userName: String,
        messageId: String, // mongoId sorted with userID and merged
        friendStatus: String, // pending, approved, etc
        created: Date,
        friend: Boolean // when accepted, flip true
    }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    blocked: [{ type: Schema.Types.ObjectId, ref: "User" }],
    gallery: [{ type: Schema.Types.ObjectId, ref: "Gallery" }],

    level: Number, // for leader board
    completed: [{ type: Schema.Types.ObjectId, ref: "Challenges" }], // maybe for completed challenges?


}, { timestamps: true }
)

const User = mongoose.model("User", UserSchema)

module.exports = User