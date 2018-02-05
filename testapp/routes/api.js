//'use strict';
var express = require('express');
var router = express.Router();
var uscore = require("underscore");
var files =  require('../common/readfile.js');

router.get('/users/list',(req,res) => {
    res.json(files.readFile());
});

router.get('/users/register', function(req, res, next) {
 res.render('register');
});

router.post('/users/save',(req,res) => {
    files.writeFile(req.body);
    res.redirect('/api/users/list');

});
 router.get('/users/login', function(req, res, next) {
 res.render('login');
});
router.post('/users/validatelogin', function(req, res, next) {
let logindata = files.readFile();
console.log(req.body.password);
var userdetails = uscore.where(logindata.users, {username: req.body.username,password:req.body.password});
let loginstatus = userdetails.length ? true:false;
let logininfo = {};
logininfo.staus = loginstatus;
logininfo.userprofile = loginstatus ? userdetails[0] : [];
//let usermessage='{loginstatus:' + loginstatus + ',userprofile: ' + userdetails[0] +  '}'  
res.json(logininfo);
});

module.exports = router;