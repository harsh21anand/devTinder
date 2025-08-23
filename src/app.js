const express = require("express");
const connectDB=require("./config/database");
const app = express();
// app.use("/",(err, req, res ,next )=>{
//     if(err){
//         res.status(500).send("something went wrong");

//     }
// });

// app.get("/getUserData",(req ,res) =>{
//     //try{
  
//     throw new Error("sdfghjkl");
//     res.send("get user send ");
//     //} catch(err){
//     //    res.status(500).send("something went wrong");}
// })

// app.get("/",(err, req, res ,next )=>{
//     if(err){
//         res.status(500).send("something went wrong");

//     }});


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


 