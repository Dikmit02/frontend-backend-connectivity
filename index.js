
const express = require('express')
const hbs=require('hbs')
// const axios=require('axios')
const path=require('path')
const cookieParser =require( 'cookie-parser')
require('./db/mongoose')
const google_util=require('./controllers/auth.controllers')
const userRouter = require('./src/Router/userRouter')



const app = express()
const port = process.env.PORT || 3000


const publicDirectoryPath = path.join(__dirname, '/public')
const viewsPath = path.join(__dirname, '/templates/views')
const partialPath = path.join(__dirname, '/templates/partials')

app.use(express.static(publicDirectoryPath))



app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

app.get('', (req, res) => {
    res.render('home')
})

app.get('/signup',(req, res) => {
    res.render('signup')
})

app.use('/v',userRouter)






// app.get('/myword', async(req, res) => {

//     const code = req.query.code
//     const {data}=await google_util.getTokenFromCode(code)
//     const user=await google_util.getuserInfo(data);
//     console.log(user)
// })



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
