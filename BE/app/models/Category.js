const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    supplies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplies",
        },
    ],
})

module.exports = mongoose.model('Category', Category);