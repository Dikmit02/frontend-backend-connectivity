const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    source: { type: String },
    name: { type: String },
    email: { type: String, unique: true ,required:true},
    hashPassword: { type: String },
    createdAt: { type: Date, default: Date.now() }
    // ,
    // code:{type:String}

})

module.exports = userSchema