var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// To configure passport package
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    // Passport local Mongoose add automatically username and password field
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    } 

    /* username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    } */
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);