const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxLength: 12,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
}, { timestamps: true }
)

module.exports = mongoose.model('User', User);