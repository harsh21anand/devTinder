const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const connectDB=require("./config/database");
const {userAuth} = require("./middleware/auth");

//const { body, validationResult } = require("express-validator");

const { validateSignUpData , validateLoginData } = require("./utils/validation");

const app = express();
const bcrypt  = require("bcrypt");

const User = require("./models/user");
app.use(express.json()); // middelware
app.use(cookieParser());

connectDB();

// ***********Signup route with validation ***********************
app.post("/signup",async (req, res) => {

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

app.post("/login", async( req , res) =>{
 
  try{
    validateLoginData(req);
    const {email , password} = req.body;
    const user = await User.findOne({email:email});
    if(!user) {
      return res.status(404).send("Invalid Credentials");
    }
    // check if user is present in database
  const isPasswordValid = await bcrypt.compare(password ,user.password);

  if(isPasswordValid){
  // create a JWT Token 
  const token = await jwt.sign({_id:user._id} , "DEV@Tinder$790",{expiresIn :"7d"});  // secret key
  console.log(token);

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


app.get("/profile",userAuth , async (req , res) =>{
  try{
    const user = req.user;

   res.send(user);

  }catch(error){
    res.status(400).send("ERROR :" + error.message);
  }
});


app.post("/sendConnectionRequest",userAuth, async(req , res) =>{

  const user = req.user;
  // send connection request 
  console.log("Send Connection Request");

  res.send(user.firstName + " send the connection request");
})
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


 