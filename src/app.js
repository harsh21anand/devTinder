const express = require("express");
const connectDB=require("./config/database");
const app = express();


const User = require("./models/user");
app.use(express.json()); // middelware
app.post("/signup", async (req, res) => {

  try {
    // creating a new instance of user model
    const user = new User(req.body);
    await user.save();

    res.send("user added successfully" );
  } catch(error) {
    res.status(400).send("Error saving to  user");
  }
 });

//  //fetch one user from database by email
 app.get("/user",async(req , res) =>{
 const emailId  = req.body.email;
  try{
    const user= await User.findOne({email:emailId});
       if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (error) {
    res.status(500).send("Error fetching user");
  }
  
 });


 //feed API -- get all the users from the database
 app.get("/feed", async (req , res) =>{
  const userEmail = req.body.email ;
  const data = req.body;
  try{
    const users = await User.find({}); // due to empty filter it fetches all the users from the collection
    if(users.length === 0){
      return res.status(404).send("No users found");
    }else{
      return res.send(users);
    }
  } catch (error){
    res.status(500).send("Error fetching users" );
  }

  
});

app.delete("/user", async(req, res) =>{
  const userId = req.body.id;
  try{
   // const deleteUser = await User.findOneAndDelete({_id:userId});
   // or we write like this 
    const deleteUser = await User.findOneAndDelete(userId);
    if(!deleteUser){
      return res.status(404).send("User not found");
    }else{
      return res.send("User deleted successfully");
    }
  }catch (error){
    res.status(500).send("Error deleting user");
  }

});


// app.patch("/user", async (req , res) =>{
//   const userId = req.body.userId ;
//    const data = req.body;
// try{
//   await User.findByIdAndUpdate({_id:userId },data);
//   res.send("User Updated Successfully");
// }catch (error){
//   res.status(500).send("Error updating user" );
// }
  
// });


app.patch("/user", async(req ,res) =>{
  const emailId = req.body.email;
  console.log(emailId);
  try{
    const user =await User.findOneAndUpdate(
      
      {email:emailId},
      {$set:{ "skills": ["C", "C++", "Java"]}},
    {new:true ,  runValidators:true}
    );
    if(!user){
      return res.status(404).send("user not found");
    
    }
    res.status(200).send("User updated successfully");
    }catch(error){
      res.status(500).send("Error not updated users successfully" ,error.message);
    }
  });
  
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


 