const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const signUpRoute = require('./route/signUpRoute');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB,{useNewUrlParser:true}).then(
    () => {console.log("connected to db")},
    err => {console.log("Error in db connection",err)}
);
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
console.log("ni node server");
app.use('/signUp',signUpRoute);

app.listen(PORT,function(){
    console.log("listening server ",PORT);
});