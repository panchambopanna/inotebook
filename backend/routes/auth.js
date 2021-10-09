const express = require('express'); //this is to communicate b/w backend and database
const User = require('../models/User'); //this is importing schema for user
const router = express.Router(); //router for express to contact API
const { body, validationResult } = require('express-validator'); //This is to validate fields entered
const bcrypt = require('bcryptjs'); //this is to has passwords
const jwt = require('jsonwebtoken'); //tihs is to egnerated usertoken to authenticate user
const fetchUser = require('../middleware/fetchuser'); //this gets the fetchUser function fom middleeware folder fetchuser file

const JWT_KEY = 'panchamisagoodboy'; // this is a secret key fpr JWT authentication

//ROUTE 1: create a User using: POST "/api/auth/createUser". Doesn't require Authentication
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
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_KEY);

        res.json({ authtoken });

        // .then(user => res.json(user))
        // .catch(err=>{console.log(err)
        // res.json({error: 'Please enter a unique value', message: err.message})})
    } catch (error) {
        console.error(error.message); //ideally logger or SQS is used to log error messages
        res.status(500).send("Internal server error");
    }
}
)

//ROUTE 2: create a User using: POST "/api/auth/loginUser". Doesn't require Authentication
router.post('/loginUser', [
    body('email', 'Invalid email address').isEmail(), //validating 'email' in body of request  by format
    body('password', 'Password canot be blank').exists() //validating 'password' in body of request by length 
], async (req, res) => {

    // this checks if the request is faulty and sends a response of 400 and the error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        //check if the email entered is in the database
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({ error: "Incorrect eamil or password. Please check the credentials and try again" });
        }
        //compare the pasword entered with the password in database
        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.status(400).json({ error: "Incorrect eamil or password. Please check the credentials and try again" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_KEY);
        res.json({ authtoken });


    } catch (error) {
        console.error(error.message); //ideally logger or SQS is used to log error messages
        res.status(500).send("Internal server error");
    }

})

//ROUTE 3: Get user details: POST "/api/auth/getUser". Requires Authentication
router.post('/getUser', fetchUser, [
], async (req, res) => {
    try {
        userId = req.user.id; //fetched the ID from user 
        const user = await User.findById(userId).select("-password"); //gets all user details except password
        res.send(user); //sends the user data in response
    } catch (error) {
        res.status(500).send("Internal server error");
    }

})

module.exports = router;