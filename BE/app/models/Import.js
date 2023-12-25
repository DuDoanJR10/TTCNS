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
            quantityImport: {
                type: Number
            },
            oldQuantity: {
                type: Number
            },
            key: {
                type: Number
            },
            created: {
                type: String 
            }
        }
    ]
}, { timestamps: true }
)

module.exports = mongoose.model('Import', Import);
