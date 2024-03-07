const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    cover: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    IVA: {
        type: Number,
        required: true
    },
    state: {
        type: Boolean,
        default: true
    },

});

module.exports = model("Product", productSchema);