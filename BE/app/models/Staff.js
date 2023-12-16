const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Staff = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    },
    phone: {
        type: String,
    },
})

module.exports = mongoose.model('Staff', Staff);