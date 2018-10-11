var express = require('express');
var router = express.Router();
var User = require('../models/user');

//GET /profile
router.get('/profile', function(req,res,next){
    if (! req.session.userId){
        var err = new Error('You must log in to view this page!');
        err.status = 403;
        return next(err);
    }
    User.findById(req.session.userId)
        .exec(function (error, user){
            if (error) {
                return next(error);
            } else {
                return res.render('profile', {title: 'Profile', name: user.name});
            }
        });
});

//GET /login
router.get('/login', function(req,res,next){
    return res.render('login', { title: 'Log In'});
});

//POST /login
router.post('/login', function(req,res,next){
    if(req.body.email && req.body.password){
        User.authenticate(req.body.email, req.body.password, function(err, user){
            if (err || !user){
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });
    } else {
        var err = new Error('Email and password are required.');
        err.status = 401;
        return next(err);
    }
});

//GET /logout
router.get('/logout', function(req,res,next){
    if(req.session){
        //end session and logout by deleting
        req.session.destroy(function(err) {
            if(err){return next(err)}
            else {return res.redirect('/');}
        });
    }

});


//GET /register
router.get('/register', function(req,res,next){
    return res.render('register', {title: 'Register'});
});

//post route for registration needs mongoDB connection, haven't tested the code yet
//POST /register
router.post('/register', function(req,res,next){

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

            //create object from info we want to store
            var userData = {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password
            };

            // use schema create to insert doc into mongo
            User.create(userData, function (err, user){
                if (err){
                    return next(err);
                } else {
                    return res.redirect('/profile');
                }
            });

    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
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