const express = require("express");

const app = express();
const {authadmin , authuser}= require("./middleware/auth");

app.use("/admin",authadmin);

app.post("/user/login",(req,res) =>{
    res.send("user login successfully")
});

// All other user routes secure
app.use("/user", authuser,(req, res) =>{
    res.send("user authenticated successfully!!!")
});

app.get("/admin", (req, res) =>{
    res.send("welcome to admin page  ");
});
app.get("/admin/getAll",(req, res) =>{
res.send("All data send to admin");
});

app.get("/admin/deleteAll", (req ,res) =>{
    res.send("All data deleted by admin");
});

app.get("/user/profile", (req ,res) =>{
    res.send("welcome to user page ");
});





 app.listen(7777,() => {
    console.log("Server is running at port no 7777");
 });
 