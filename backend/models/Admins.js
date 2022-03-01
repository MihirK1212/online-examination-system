const mongoose = require('mongoose')

const adminsSchema = mongoose.Schema({
    adminEmail : String,
    instituteName : String
})



var Admins = mongoose.model('Admins', adminsSchema);

module.exports = Admins