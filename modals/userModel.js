const mongoose =require("mongoose");
const userModel = mongoose.Schema({
    Email:String,
    Name:String,
    Password:String,
    Location:String,
    Position:String,
    Age:String,
    Department:String,
},{
    timestamps:true,
})

const User=new mongoose.model("User",userModel);
module.exports =User

