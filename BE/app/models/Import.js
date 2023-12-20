const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Import = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
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
}, { timestamps: true }
)

module.exports = mongoose.model('Import', Import);
