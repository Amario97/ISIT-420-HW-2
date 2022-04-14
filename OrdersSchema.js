

const mongoose = require("mongoose");

// here we define a schema for our document database
// mongo does not need this, but using mongoose and requiring a 
// schema will enforce consistency in all our documents (records)
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
    SalesPersonID: {
      type: Number,
      required: true
    },
    CdID: {
      type: Number,
      required: true
    },
    PricePaid: {
      type: Number,
      required: true
    },
    ID: {                   // we are going to ignore mongo's _id
      type: String,
      required: true
    },
    Date: {
      type: Date,
      required: true
    }
  });

  module.exports = mongoose.model("500Orders", OrdersSchema);