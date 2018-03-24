var express = require('express');
var router =  express.Router();
const axios = require('axios');

router.get('/',function(req,res,next){

    res.render('mtunes',{layout : 'masterLayout'});

});

router.get('/search/:item',function(req,res,next){
    axios.get('https://itunes.apple.com/search?term='+ req.params.item)
    .then(response => {
      res.send(response.data.results);
    })
    .catch(error => {
      console.log(error);
    });
});
router.get('/favourites',function(req,res,next){
  res.render('mtunes-favourites',{layout : 'masterLayout'});
});
module.exports = router;