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



 //**logic to handle get , post ,patch , delete API calls */

 
// app.get ("/user",(req ,res)=>{
//     res.send({firstname:"John", lastname:"Doe", age:30, city:"New York"});
// });

// app.post("/user",(req ,res) =>{
//     console.log(req.body);
//     res.send({message: "User created successfully"});
// });
// app.delete("/user",(req,res)=>{
//     res.send({message:"user deleted Sucessfully"});
// });


// dynamic routes 
// app.get("/user/:userId/:name/:password",(req ,res)=>{
//     console.log(req.params);
//     res.send({firstName:"John" , lastName:"Doe"});
// });


// ******Middlewares & Error Handlers*****


app.get(
    "/user",
     (req , res , next)=>{
    console.log('Handling the route user !!!');
    next();
},
(req , res ,next )=>{
    console.log("Handling the route user 2!!!");
    next();
},
(req , res,next )=>{
    console.log("Handling the route user 3!!!");
   next();
},
(req , res)=>{
    console.log("Handling the route user 4!!!");
    res.send("5 th middlewear");
}
);





 app.listen(7777,() => {
    console.log("Server is running at port no 7777");
 });
 