var express = require('express');
var router =  express.Router();
const axios = require('axios');
var uscore = require("underscore");
var files =  require('../common/readfile.js');

router.get('/',function(req,res,next){

    res.render('mtunes',{layout : 'masterLayout'});

});

router.get('/search/:item',function(req,res,next){
    axios.get('https://itunes.apple.com/search?term='+ req.params.item)
    .then(response => {
      req.session.mtunesdata=response.data.results;
      res.send(response.data.results);
    })
    .catch(error => {
      console.log(error);
    });
});
router.get('/favourites',function(req,res,next){
  console.log('mtunes data');
  files.readFile('./data/mtunes.data',function(err,data){
    console.log(data);
    res.render('mtunes-favourites',{layout:'masterLayout',favitems : data});
  });
//res.json(req.session.mtunesdata);
  //res.render('mtunes-favourites',{layout : 'masterLayout'});
});
router.get('/addfav/:itemId',function(req,res,next){
  const strTrackId = req.params.itemId;
console.log(strTrackId);
const mtunesdata = req.session.mtunesdata;
console.log(mtunesdata);
console.log(strTrackId);
var trackdata = uscore.where(mtunesdata,{trackId:strTrackId});
console.log(trackdata);


});
module.exports = router;