var express = require('express');
var router = express.Router();

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