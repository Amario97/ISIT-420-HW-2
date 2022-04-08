let x = 2;
var express = require('express');
var router = express.Router();
var fs = require("fs");

// start by creating data so we don't have to type it in each time
let ServerDataArray = [];

// define a constructor to create movie objects
let DataObject = function () {
  this.ID = 98053//Math.random().toString(16).slice(5)  // tiny chance could get duplicates!
  this.SalesPersonID = 1;
  this.CdID = 123456;
  this.PricePaid = 55555; 
  this.Date = Date.now();  
}

// my file management code, embedded in an object
fileManager  = {
  read: function() {
    const stat = fs.statSync('Data.json');
    if (stat.size !== 0) {                           
    var rawdata = fs.readFileSync('Data.json'); // read disk file
    ServerDataArray = JSON.parse(rawdata);  // turn the file data into JSON format and overwrite our array
    }
    else {
      // make up 3 for testing
      ServerDataArray.push(new DataObject());
      fileManager.write();
    }
  },
  
  write: function() {
    let data = JSON.stringify(ServerDataArray);    // take our object data and make it writeable
    fs.writeFileSync('Data.json', data);  // write it
  },
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

/* GET all data */
router.get('/getAll', function(req, res) {
  fileManager.read();
  res.status(200).json(ServerDataArray);
});


/* Add one new Data */
router.post('/AddData', function(req, res) {
  const newData = req.body;  // get the object from the req object sent from browser
  console.log(newData);
  ServerDataArray.push(newData);  // add it to our "DB"  (array)
  fileManager.write();
  // prepare a reply to the browser
  var response = {
    status  : 200,
    success : 'Added Successfully'
  }
  res.end(JSON.stringify(response)); // send reply
});


module.exports = router;
