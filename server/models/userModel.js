const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Please enter your username"]
    },

    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please enter valid email address"],
        unique: true
    },

    attempted: {
        type: Boolean,
        required: false,
        default: false
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    },

    password: {
        type: String,
        required: [true, "Please enter a password"]
    }

})

const User = mongoose.model('User', UserSchema)
module.exports = User