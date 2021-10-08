const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');

//create a User using: POST "/api/auth/createUser". Doesn't require Authentication

router.post('/createUser',[
    body('name', "Length should be greater than 3").isLength({ min: 5 }), //validating 'name' in body of request by length
    body('email', 'Invalid email address').isEmail(), //validating 'email' in body of request  by format
    body('password', 'Minimum length: 8').isLength({ min: 5}) //validating 'password' in body of request by length 
],async (req,res)=>{
    // this checks if the request is faulty and sends a response of 400 and the error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check if the user with the particular email exists already
    if (user = req.body.email){
        res.json({error: 'This email already exists', message: err.message})
    }

    //creating a user here if validation has passed
    let user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        })
        
        // .then(user => res.json(user))
        // .catch(err=>{console.log(err)
        // res.json({error: 'Please enter a unique value', message: err.message})})
    }
)

module.exports = router 