
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth= async(req , res,next) =>{
 // Read the token from the request cookie
 const cookies = req.cookies;
try{
 const {token} = cookies;

 if(!token){
  throw new Error(": Token is not valid !!!!!!!");
 }

 // Validate the token 
 const decodedObj = await jwt.verify(token , "DEV@Tinder$790");
 
 const{_id} = decodedObj;
  // find the username
 const user = await User.findById({_id});
 if(!user){
  throw new Error("User is not found");
 }
 req.user = user;  //logged in user 
 next();
}
 catch(err){
  res.status(400).send("ERROR" + err.message);
 }
}

module.exports =userAuth;