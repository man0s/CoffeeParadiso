var mongoose = require("mongoose");

var deliverymanSchema = new mongoose.Schema({
        username: String,
        password: String,
        name: String,
        surname: String,
        AFM: String,
        AMKA: String,
        IBAN: String,
        active: Boolean,
        available: Boolean,
        location: {
                lat: Number,
                lng: Number
        },
        hours: [{
                start: Number,
                end: Number,
                deliveries: Number
        }]
    });
    
module.exports = mongoose.model("Deliveryman", deliverymanSchema);