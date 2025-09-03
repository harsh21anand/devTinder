const { ServerMonitoringMode } = require('mongodb');
const  validator = require('validator');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName:{
    type:String, 
    required:true,
    minlength:3,
    maxlength:8
  },
  lastName:{
    type:String
  },
  email:{
    type:String,
    required:true ,// it is necessary to fill the email
    unique:true, // this can not allow duplicate email
    lowercase:true, // this can convert the email to lowercase
    trim: true ,// this can remove before and after email
    match: [/\S+@\S+\.\S+/, 'Email format is invalid'],
    // other way to fix validation issue its for all type of validation 
    
    //validate(value){
    //   if(!validator.isEmail(value)){
    //     throw new Error("Invalid email address"+value);
    //   }
    // }

  },
  password:{
    type: String ,
  required:true
},
  age:{
    type : Number ,
   
    trim:true,
    min:18,
    max:65
  },
  gender:{
    type: String,
    
     trim: true,
     validate(value){
      if(!["male","female" ,"others"].includes(value)){
        throw new Error(" Gender data is not valid");
      }
     },
    }
     ,
  about:{
    type:String,
    trim:true, 
    default:"This is default about the user!"
  },
  skills:{
    type:[String],  // it can store multiple skills in array
    trim:true,
  },
  photoUrl:{
    type:String , 
    default:"https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
  },
  phoneNumber:{
    type: String,
    trim:true,
    maxlength:10,
    minLength :10,
  match: [/^\+91[6-9]\d{9}$/, 'Phone number must start with +91 and be valid']
  }
}, {
  timestamps:true  // it can create two extra fields createdAt and updatedAt
});


//##### whenever we reference a model it starts with a capital letter####

const User = mongoose.model("user",userSchema);
module.exports = User;

// or we write like that both are useful 

// module.exports = mongoose.model("user",userSchema);
