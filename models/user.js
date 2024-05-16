import mongoose from "mongoose";

const userData  = new mongoose.Schema({
    name : {type: String , required:true ,trim:true},
    email : {type: String , required:true ,trim:true},
    password : {type: String , required:true ,trim:true},
    tc : {type : Boolean, required:true}
})

//model 
const userModel = mongoose.model("user" , userData)

export default userModel;

