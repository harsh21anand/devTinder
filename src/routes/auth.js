const express = require('express');
const { validateSignUpData , validateLoginData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


const authRouter = express.Router(); // or 

// const app = express();
// and app.use();


//they are exacltly same  


authRouter.post("/signup",async (req, res) => {

try {
    // validation of data
    validateSignUpData(req);
    // Encrypt the password
  const {firstName , lastName , email ,password} = req.body;
    const passwordHash =  await bcrypt.hash(password , 10);
   

      // Creating a new instance of the user model
    const user = new User({
      firstName,
      lastName , 
      email,
      password: passwordHash,
      age: req.body.age,
      gender: req.body.gender
    });
    await user.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(400).send("ERROR :" +error.message );
  }
});

authRouter.post("/login", async( req , res) =>{
 
  try{
    validateLoginData(req);
    const {email , password} = req.body;
    const user = await User.findOne({email:email});
    if(!user) {
      return res.status(404).send("Invalid Credentials");
    }
    // check if user is present in database
  const isPasswordValid = await user.validatePassword(password);
  if(isPasswordValid){
  // create a JWT Token 
  const token = await user.getJWT();  // it directly refers to getJWT method whcih defiend in userSchema and it indicates current user 

  // Add the token to cookie and send the response back to the user 
   res.cookie("token" , token , { expires:new Date(Date.now() + 7*24*60*60*1000) });
    res.send("login successfully");
  }else{
    throw new Error("Invalid Credentials");
  }

  }catch (error) {
    res.status(400).send("ERROR :" + error.message );
  }
})

authRouter.post("/logout" , async ( req , res ) =>{
  try{
    res.cookie("token" , null , {expires : new Date(Date.now()),
      httpOnly : true,
      secure : true 

    });
    res.status(200).send("Logout successfully");
  }
  catch(err){
    res.status(400).send("ERROR" + err.message);
  }
});


module.exports = authRouter ;