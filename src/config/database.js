
// go to mongoDb website 
// create a free mongoDb cluster 
//copy the connection string
// replace the password with your password
// replace the database name with your database name
// paste the connection string here


// install mongoDb compass for GUI  based mamangement system

//------------------------------------------------------
const mongoose = require('mongoose');

const connectDB = async () => {
  
    await mongoose.connect(
      "mongodb+srv://<username>:<password>@harshdb.kulxtul.mongodb.net/devTinder" // end with database name 

      // if  we not write database name it  refers to cluster name 
    );
  };

  module.exports = connectDB;
  
//connectDB();
