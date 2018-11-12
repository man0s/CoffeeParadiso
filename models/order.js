var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        cart: Object,
        firstName: String,
        lastName: String,
        address: String,
        phoneNumber: String,
        timestamp: Number,
        location: {
                lat: Number,
                lng: Number
        },
        delivered: Boolean,
        store: {
                store: Object,
                dist: Number
        },
        deliveryman: {
                user: Object,
                dist: Number
        }
    });

module.exports = mongoose.model("Order", orderSchema);