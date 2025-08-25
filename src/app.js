const express = require("express");
const connectDB=require("./config/database");
const app = express();


const User = require("./models/user");

app.post("/signup", async (req, res) => {
  try {
    // creating a new instance of user model
    const user = new User({
      firstName : "Harsh",
      lastName : "Anand",
      email : "harshanand160802@gmail.com",
      password : "Harsh@123"
    });
    await user.save();

    res.send("user added successfully" );
  } catch(error) {
    res.status(500).send("Error adding user");
  }
});


  connectDB()
    .then(()=>{
      console.log("Database connection established...");
      
     app.listen(7777,() => {
    console.log("Server is running at port no 7777");
     });
    })
    
  .catch( (err)=> {
    console.error("Database connection failed...", err);
  });


 