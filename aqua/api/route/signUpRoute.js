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

signUpRoute.route('/').get(function(req,res){
    SignUp.find(function(err,data){
        if(err){
            console.log(err);
        } else {
            console.log("user list get-",data);
            res.json(data);
        }

    });
});

// Defined delete | remove | destroy route
signUpRoute.route('/delete/:id').get(function (req, res) {
    SignUp.findByIdAndRemove({_id: req.params.id}, function(err, data){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = signUpRoute;
