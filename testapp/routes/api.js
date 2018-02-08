//'use strict';
var express = require('express');
var router = express.Router();
var uscore = require("underscore");
var files =  require('../common/lib.js');

router.get('/users/list',(req,res) => {
    console.log('read async file');
    files.getUsers(function(err,data){
    if(err)
        res.json({status:'ERROR',message:err});

        res.json(data);
    });
});
router.get('/users/checkuser/:userid',(req,res) => {
    files.checkusername(req.params.userid,function(err,data){
    if(err)
        res.json({status:'ERROR',message:err});
        if(data)
            res.json({status:'ALREADY EXISTS',message:'username is already taken'});
        else
            res.json({status:'AVAILABLE',message:'username is available'});
    });
});
router.get('/users/register', function(req, res, next) {
 res.render('register');
});

router.post('/users/save',(req,res) => {
    var user = {
        username : req.body.username,
        password : req.body.password,
        email : req.body.email
    };
    files.saveUsers(user,function(err,status){
      if (err)
        res.json({status: 'ERROR',message : 'error while saving user'});
      else if(status === 'EXISTS')
        res.json({status: 'EXISTS',message : 'user already exists'});
        else
      res.redirect('/api/users/list');
      
    });
   

});
 router.get('/users/login', function(req, res, next) {
 res.render('login');
});
router.post('/users/validatelogin', function(req, res, next) {
let logindata = files.readFile('./data/login.data');
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