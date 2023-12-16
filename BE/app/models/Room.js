const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Room = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    staffs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Staff",
        },
    ],
})

module.exports = mongoose.model('Room', Room);