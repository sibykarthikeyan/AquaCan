const express = require('express');
const signUpRoute = express.Router();

let SignUp = require('../model/signUp');
console.log("--- node server route");

signUpRoute.route('/add').post(function(req,res){
    let signUp = new SignUp(req.body);
    signUp.save()
        .then(signUp => {
            res.status(200).json({'signUp':'User added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save in db");
        });
});



module.exports = signUpRoute;
