var express = require('express');
var router = express.Router();
var User = require('../models/user');


//GET /register
router.get('/register', function(req,res,next){
    return res.render('register', {title: 'Register'});
});

//post route for registration needs mongoDB connection, haven't tested the code yet

//POST /register
router.post('/register', function(req,res,next){
    res.send('under construction');
    /*
    //still throwing an error that im not sure why, investigate!
    //make sure form fields are not empty or send error message
    if (req.body.email &&
        req.body.firstName &&
        req.body.lastName &&
        req.body.password &&
        req.body.confirmPassword){
            //confirm passwords match or send error message
            if(req.body.password !== req.body.confirmPassword){
                var err = new Error('Passwords must match!');
                err.status = 400;
                return next(err);            
            }
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
    */
});



//GET /
router.get('/', (req, res) => {
    return res.render('index', {title: 'Home'});
});

//GET /about
router.get('/about', (req, res) => {
    return res.render('about', {title: 'About'});
});

//GET /contact
router.get('/contact', (req, res) => {
    return res.render('contact', {title: 'Contact'});
});

module.exports = router;