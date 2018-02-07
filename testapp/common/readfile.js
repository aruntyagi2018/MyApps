var fs = require('fs');
var loginfile = './data/login.data';
var files = {
  readFile: function (callback) {
     fs.readFile(loginfile, (err, data) => {  
      if (err)
      {
        callback(err,undefined);
      } 
      callback(undefined,JSON.parse(data));
     });
  },
  checkusername : function(username,callback)
  {
    console.log(username);
    files.readFile(function(err,data)
    {
      let userexists = false;
      if(err)
        callback(err,undefined);
      console.log(data.users);
       var result =  data.users.filter(function(user,username){
            return user.username.toLowerCase().indexOf(username) !== -1;
            });
      console.log('user.username 111');
      console.log(result.length);
      console.log(result.length);
      callback(undefined,userexists);
     
    });
  },
  writeFile: function (userdata) {
    let filedata =  files.readFile('./data/login.data');
    filedata.users.push(userdata);
    fs.writeFileSync('./data/login.data', JSON.stringify(filedata));  
  }
};
module.exports = files;