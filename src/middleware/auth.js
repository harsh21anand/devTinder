const authadmin = (req ,res,next ) =>{
  //const token = req.headers["authorization"];
const token ="xyz123";
const isadminAuthorized = token ==="xyz123";

if(!isadminAuthorized){
 res.status(401).send("unauthorized acces ");
}else{
  
next();
}
}

const authuser= (req , res,next) =>{
  const token = "xyz23";
  const isuserAuthorized =token ==="xyz23";
  if(!isuserAuthorized){
    
    res.status(401).send("unauthorized user access ");
  }
  else{
    next();
  }
}

module.exports ={
  authadmin,
  authuser
}