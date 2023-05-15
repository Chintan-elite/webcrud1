const { log } = require("console");
const express = require("express")
const app = express()
require("dotenv").config();
const mongoose = require("mongoose")
const hbs = require("hbs")
const path = require("path")
const PORT = process.env.PORT
const DB_URL=process.env.DB_URL
var bodyParser = require('body-parser')

var cookieParser = require('cookie-parser')
app.use(cookieParser())
mongoose.connect(DB_URL).then(()=>{
    console.log("Db Connected...");
}).catch(err=>{
    console.log(err);
})

const publicPath = path.join(__dirname,"../public")
const viewPath = path.join(__dirname,"../templetes/views")
const partialPath = path.join(__dirname,"../templetes/partials")

app.set("view engine","hbs")
app.set("views",viewPath)
app.use(express.static(publicPath))
hbs.registerPartials(partialPath)
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/",require("../router/userrouter"))


app.listen(PORT,()=>{
    console.log("Server runnig on port : "+PORT);
})