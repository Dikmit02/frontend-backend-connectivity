const mongoose=require('mongoose')

const userSchema=require('./user')
const userModel= mongoose.model('users',userSchema)

module.exports=userModel