
const express = require('express')
const hbs=require('hbs')
const cors=require('cors')
const path=require('path')
const cookieParser =require( 'cookie-parser')
require('./db/mongoose')
const userRouter = require('./src/Router/userRouter')



const app = express()
app.use(cors())
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

app.get('/login',(req,res)=>{
    res.render('login')
})

app.use('/v',userRouter)


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
