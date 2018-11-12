var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
        type: String,
        name: String,
        image: String,
        price: Number,
        desc: String
    });

module.exports = mongoose.model("Product", productSchema);