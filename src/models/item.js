const mongoose = require('mongoose')
const Schema = mongoose.Schema

let itemSchema = new Schema({
    name: String,
    description: String,
    localitation: String,
    image: String,
    price: Number,
    stock: Number,
    pdf: String,
    stock_limit: Number,
    warning: Boolean
}, {
    timestamps: true
})

module.exports = mongoose.model("item", itemSchema)