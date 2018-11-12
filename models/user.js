var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
        type: String,
        username: String,
        password: String,
        phoneNumber: String
    });

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);