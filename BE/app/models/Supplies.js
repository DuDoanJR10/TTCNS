const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Supplies = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    description: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    brand: {
        type: String,
    },
    color: {
        type: String,
    },
    size: {
        type: String
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('Supplies', Supplies);