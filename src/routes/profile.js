const express = require("express");
const userAuth = require("../middleware/auth");
const {validateProfileEditData} = require("../utils/validation");


const profileRouter = express.Router();




profileRouter.get("/profile/view",userAuth , async (req , res) =>{
  try{
    const user = req.user;
   // sending a connection request
   res.send(user);
 
  }catch(error){
    res.status(400).send("ERROR :" + error.message);
  }
});

profileRouter.patch("/profile/edit" , userAuth , async(req ,res) =>{
  try {
if(!validateProfileEditData(req)){
  throw new Error("  Invalid Edit Request");
};

const user = req.user;  // for logged in user 


Object.keys(req.body).forEach((key) =>{
   user[key] = req.body[key];
})

await user.save(); // userdata save in database ;


res.json({
  message:`${user.firstName}  ,profile data successfully ,
  data: user,
  `});
  }catch( err){
    res.status(400).send("ERROR" +err.message);
  }

});

module.exports = profileRouter;