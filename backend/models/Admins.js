const mongoose = require('mongoose')

const adminsSchema = mongoose.Schema({
    adminEmail : {
        type : String,
        unique : true
    },
    instituteName : String
})



var Admins = mongoose.model('Admins', adminsSchema);

module.exports = Admins