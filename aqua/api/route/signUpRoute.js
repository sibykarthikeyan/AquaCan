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

signUpRoute.route('/edit/:id').get(function (req, res) {
    SignUp.findById({_id:req.params.id}, function(err, data){
        res.json(data);
    });
});

//  Defined update route
signUpRoute.route('/update/:id').post(function (req, res) {
    SignUp.findById(req.params.id, function(err, uData) {
    if (!uData)
      res.status(404).send("data is not found");
    else {
        uData.userName = req.body.userName;
        uData.emailId = req.body.emailId;
        uData.mobileNumber = req.body.mobileNumber;

        uData.save().then(uData => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

module.exports = signUpRoute;
