var fs = require('fs');
var files = {
  readFile: function (filepath) {
      console.log('filepath');
     console.log(filepath);
     let rawdata = fs.readFileSync(filepath);  
     let jsondata = JSON.parse(rawdata); 
     return jsondata;
     // fs.readFile('./data/login.data', (err, data) => {  
     //     console.log('read from file');
     //  if (err)
    //   {
        //   console.log('error while reading');
    //   } 
       //throw err;
      // console.log(data);
    //   console.log(JSON.parse(data));
      //    return  JSON.parse(data);
    //  });
       //console.log('after read from file');
      // console.log(logindata);
      //return logindata;
  },
  writeFile: function (userdata) {
    let filedata =  files.readFile('./data/login.data');
    filedata.users.push(userdata);
    fs.writeFileSync('./data/login.data', JSON.stringify(filedata));  
  }
};
module.exports = files;