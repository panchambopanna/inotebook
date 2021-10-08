const express = require('express'); //this is to communicate b/w backend and database
const User = require('../models/User'); //this is importing schema for user
const router = express.Router(); //router for express to contact API
const { body, validationResult } = require('express-validator'); //This is to validate fields entered
const bcrypt = require('bcryptjs'); //this is to has passwords
const jwt = require('jsonwebtoken'); //tihs is to egnerated usertoken to authenticate user

const JWT_KEY = 'panchamisagoodboy'; // this is a secret key fpr JWT authentication

//create a User using: POST "/api/auth/createUser". Doesn't require Authentication
router.post('/createUser', [
    body('name', "Length should be greater than 3").isLength({ min: 5 }), //validating 'name' in body of request by length
    body('email', 'Invalid email address').isEmail(), //validating 'email' in body of request  by format
    body('password', 'Minimum length: 8').isLength({ min: 5 }) //validating 'password' in body of request by length 
], async (req, res) => {
    // this checks if the request is faulty and sends a response of 400 and the error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check if the user with the particular email exists already
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Email already exists, please try login with the same email or use different mail to sign up" });
        }

        //hashing password sing bcryptjs
        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hashSync(req.body.password, salt); //this will be our new hashed password

        //creating a user here if validation has passed
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass //hashed password
        })

        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_KEY);

        res.json({authtoken});

        // .then(user => res.json(user))
        // .catch(err=>{console.log(err)
        // res.json({error: 'Please enter a unique value', message: err.message})})
    } catch(error) {
        console.error(error.message); //ideally logger or SQS is used to log error messages
        res.status(500).send("Internal server error");
    }
}
)

module.exports = router 