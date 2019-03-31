// business.route.js

const express = require('express');
const businessRoutes = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("./config/DB");

// Require Business model in our routes module
let Business = require('./business.model');

// Defined store route
businessRoutes.route('/add').post(function (req, res) {
  let business = new Business(req.body);

  Business.findOne({email:req.body.email}).then(user => {
    
    if(user){
      return res.status(400).json({email:"Email already exist"});
    }

    bcrypt.genSalt(10,(err,salt) => { 
      bcrypt.hash(req.body.password,10,(err,hash) => {
        if(err) throw err;
        business.password = hash;
      
        business.save()
        .then(business => {
          res.status(200).json({'business': 'business in added successfully'});
        })
        .catch(err => {
          res.status(400).send("unable to save to database");
        });
      });
    });

  });
});

// Defined store route Login page
businessRoutes.route('/login').post(function (req, res) {
  let business = new Business(req.body);
  const email = req.body.email;
  const password = req.body.password;

  Business.findOne({email}).then(user => {
    
    if(!user){
      return res.status(400).json({emailnotfound:"Email not found"});
    }
    console.log("req passwrd",password);
    console.log("req busin passwrd",business.password);
    
    bcrypt.compare(password, business.password).then(isMatch => {
      //Check below code since bcryupt password should not be matched like this.
      if(password === business.password){
        // User match create payload 
        const payload = {
          id:business.id,
          name:business.name
        };
        //sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn:31556926 //1 year in seconds
          },
          (err,token) => {
            res.json({
              success:true,
              token:"Bearer " + token
            });
          }
        )

      }else{
        res.status(400).json({passwordincorrect:"Password is incorrect"});
      }
      
    });
  });
});

// Defined get data(index or listing) route
businessRoutes.route('/').get(function (req, res) {
    Business.find(function(err, businesses){
    if(err){
      console.log(err);
    }
    else {
      res.json(businesses);
    }
  });
});

// Defined edit route
businessRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Business.findById(id, function (err, business){
      res.json(business);
  });
});

//  Defined update route
businessRoutes.route('/update/:id').post(function (req, res) {
    Business.findById(req.params.id, function(err, business) {
    if (!business)
      res.status(404).send("data is not found");
    else {
        business.name = req.body.name;
        business.email = req.body.email;
        business.mobileNumber = req.body.mobileNumber;
        business.password = req.body.password;
        
        business.save().then(business => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
businessRoutes.route('/delete/:id').get(function (req, res) {
    Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = businessRoutes;
