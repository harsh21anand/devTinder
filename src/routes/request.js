const express = require('express');
const userAuth = require("../middleware/auth");
const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest",userAuth, async(req , res) =>{

  const user = req.user;
  // send connection request 
  console.log("Send Connection Request");

  res.send(user.firstName + " send the connection request");
});

module.exports = requestRouter;