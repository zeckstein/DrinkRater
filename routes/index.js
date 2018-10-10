var express = require('express');
var router = express.Router();



//GET /register
router.get('/register', function(req,res,next){
    return res.render('register', {title: 'Register'});
});


//POST /register
router.post('/register', function(req,res,next){
    return res.send('User created');
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