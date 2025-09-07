const validator = require("validator")
const validateSignUpData = (req) =>{
  const { firstName , lastName , email ,password } = req.body;

  if(!firstName || !lastName){
    throw new Error("Name is not valid");

  }
  else if(!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }
else if(!validator.isStrongPassword(password)){
    throw new Error("please enter a strong password ");
  }
};


const validateLoginData = (req) =>{
  const {email , password} = req.body;
  if(!validator.isEmail(email)){
    throw new Error(" Try a valid email address ..!");
  }else if(validator.isEmpty(password)){
    throw new Error("Password can not be empty");
    
  }
}


const validateProfileEditData = (req) =>{
  const allowedEditFields =["firstName" , "lastName" , "email" , "photourl" , "gender" , "about", "phoneNumber", "age",
    "skills"
  ];

  const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));

  return isEditAllowed;
}
module.exports = {
  validateSignUpData , validateLoginData , validateProfileEditData
}

