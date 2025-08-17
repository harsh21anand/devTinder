const express = require("express");

const app = express();



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
 