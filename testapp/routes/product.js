var express = require('express');
var router = express.Router();
var files =  require('../common/readfile.js');

router.get('/list',function(req,res){
    var products = files.readFile('./data/products.data');
    var top4 = products.results.sort(function(a, b) { return a.Variable1 < b.Variable1 ? 1 : -1; })
                .slice(0, 4);
                console.log(top4);
     res.json(top4);
});

module.exports = router;