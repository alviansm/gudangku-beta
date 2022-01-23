const mongoose = require('mongoose');
const path = require('path');
const dotenv = require("dotenv");
dotenv.config({path: path.resolve(__dirname, './config/dotenv/.env')});

// heroku vars
const mongoAtlasUri = process.env.MONGODB_URI;

try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      mongoAtlasUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected")
    );

  } catch (e) {
    console.log("could not connect");
  }

const db = mongoose.connection;

module.exports = db;
