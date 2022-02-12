const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    adminEmail : String,
    secretKey : String
})



var Admins = mongoose.model('Admins', adminSchema);

module.exports = Admins