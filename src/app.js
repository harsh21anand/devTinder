const express = require("express");

const app = express();

// 
// app.use('/about', (req, res)=>{
//     res.send("About page is working ");
// });

// app.use('/test', (req, res)=>{
//     res.send("test is working");
//  });

// app.use('/',(req,res)=>{
//     res.send("Home page ");
// });

 
app.get ("/user",(req ,res)=>{
    res.send({firstname:"John", lastname:"Doe", age:30, city:"New York"});
});

app.post("/user",(req ,res) =>{
    console.log(req.body);
    res.send({message: "User created successfully"});
});
app.delete("/user",(req,res)=>{
    res.send({message:"user deleted Sucessfully"});
});
 app.listen(7777,() => {
    console.log("Server is running at port no 7777");
 });
 