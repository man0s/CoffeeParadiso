var mongoose = require("mongoose");
    
var storeSchema = new mongoose.Schema({
        name: String,
        address: String,
        phoneNumber: String,
        location: {
                lat: Number,
                lng: Number
        },
        manager: {
                username: String,
                password: String,
                name: String,
                surname: String,
                AFM: String,
                AMKA: String,
                IBAN: String
        },
        product: [{
                name: String,
                quantity: Number
        }]
    });
    
module.exports = mongoose.model("Store", storeSchema);