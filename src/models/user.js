const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  firstName:{type:String},
  lastName:{type:String},
  email:{type:String},
  password:{type: String},
  age:{type : Number },
  gender:{type: String},
});


//##### whenever we reference a model it starts with a capital letter####

const User = mongoose.model("user",userSchema);
module.exports = User;

// or we write like that both are useful 

// module.exports = mongoose.model("user",userSchema);
