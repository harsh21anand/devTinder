const express = require("express");
const userAuth = require("../middleware/auth");


const profileRouter = express.Router();


profileRouter.get("/profile",userAuth , async (req , res) =>{
  try{
    const user = req.user;
   // sending a connection request
   res.send(user);

  }catch(error){
    res.status(400).send("ERROR :" + error.message);
  }
});

module.exports = profileRouter;