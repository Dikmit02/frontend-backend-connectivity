const config=require('../conf')
// require('dotenv').config()
const mongoose = require('mongoose')

// console.log("njvnkjf "+config.DB_URL)
// console.log("njvnkjf "+config.GoogleClientId)

// console.log("njvnkjf "+config.GoogleClientSecret)
// console.log("njvnkjf "+config.GoggleRedirectUrl)
// console.log("njvnkjf "+config.GoogleInfoUrl)

mongoose.connect(config.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
