const express = require("express");

const app = express();

// 
app.use('/about', (req, res)=>{
    res.send("About page is working ");
});

app.use('/test', (req, res)=>{
    res.send("test is working");
 });

app.use('/',(req,res)=>{
    res.send("Home page ");
});

 


 app.listen(7777,() => {
    console.log("Server is running at port no 7777");
 });
 