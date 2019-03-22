const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SignUp = new Schema({
    userName : {
        type : String
    },
    mobileNumber : {
        type : String
    },
    emailId : {
        type : String
    },
    password : {
        type : String
    }
},{
    collection: 'signUp'
});

module.exports = mongoose.model('SignUp',SignUp);