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

const mongoose = require("mongoose");

const OrdersSchema = require("../OrdersSchema");


// edited to include my non-admin, user level account and PW on mongo atlas
// and also to include the name of the mongo DB that the collection is in (MoviesDB)
const dbURI =
  //"mongodb+srv://Jorting:12345@mario-cluster.dkxzq.mongodb.net/500Orders?retryWrites=true&w=majority";
  "mongodb+srv://JaegyeomKim:qwe941215@cluster0.ipbvb.mongodb.net/Movies?retryWrites=true&w=majority"
  // Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

// my file management code, embedded in an object
// fileManager  = {
//   read: function() {
//     const stat = fs.statSync('Data.json');
//     if (stat.size !== 0) {                           
//     var rawdata = fs.readFileSync('Data.json'); // read disk file
//     ServerDataArray = JSON.parse(rawdata);  // turn the file data into JSON format and overwrite our array
//     }
//     else {
//       // make up 3 for testing
//       ServerDataArray.push(new DataObject());
//       fileManager.write();
//     }
//   },
  
//   write: function() {
//     let data = JSON.stringify(ServerDataArray);    // take our object data and make it writeable
//     fs.writeFileSync('Data.json', data);  // write it
//   },
// }


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

/* GET all data */
router.get('/getAll', function(req, res) {
  OrdersSchema.find({}, (err, All) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).json(All);
  });
});


/* Add one new Data */
// router.post('/AddData', function(req, res) {
//   const newData = req.body;  // get the object from the req object sent from browser
//   console.log(newData);
//   ServerDataArray.push(newData);  // add it to our "DB"  (array)
//   fileManager.write();
//   // prepare a reply to the browser
//   var response = {
//     status  : 200,
//     success : 'Added Successfully'
//   }
//   res.end(JSON.stringify(response)); // send reply
// });
router.post('/AddData', function(req, res) {

  let oneNewOrder = new OrdersSchema(req.body);  
  console.log(req.body);
  oneNewOrder.save((err, todo) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
    // console.log(todo);
    // res.status(201).json(todo);

    var response = {
      status  : 200,
      success : 'Added Successfully'
    }
    res.end(JSON.stringify(response)); // send reply

    }
  });
  
});
router.delete('/DeleteSalesPerson/:SalesPersonID', function (req, res) {
  OrdersSchema.deleteMany({ SalesPersonID: req.params.SalesPersonID }, (err, note) => { 
    if (err) {
      res.status(404).send(err);
    }
    var response = {
      status  : 200,
      success : 'Orders ' +  req.params.SalesPersonID + ' deleted!'
    }
    res.end(JSON.stringify(response)); // send reply
  });
});


//ID: req.params.ID
router.get('/FindSalesPerson/:ID', (req, res) => {
  OrdersSchema.find({ID : req.params.ID}).sort({SalesPersonID : 1})
    .then((result) => {
      res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
  })

module.exports = router;
