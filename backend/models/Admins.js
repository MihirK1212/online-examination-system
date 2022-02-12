const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    adminEmail : String,
    instituteName : String
})



var Admins = mongoose.model('Admins', adminSchema);

module.exports = Admins