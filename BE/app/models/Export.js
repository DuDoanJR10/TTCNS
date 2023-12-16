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
        ref: "",
        required: true,
    },
    supplies: [
        {
            idSupplies: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Supplies"
            },
            count: {
                type: Number
            }
        }
    ],
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    }
})

module.exports = mongoose.model('Export', Export);
 