const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Export = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: String,
        required: true,
    },
    staff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
        required: true,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    },
    supplies: [
        {
            name: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Supplies"
            },
            quantity: {
                type: Number
            },
            key: {
                type: Number
            }
        }
    ]
})

module.exports = mongoose.model('Export', Export);
