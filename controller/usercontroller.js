import userModel from '../models/user.js';
import bcrypt  from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController {
    static userRegistration = async (req,res) =>{
        const {name , email ,password , password_confirmation ,tc} = req.body;
        const  user  = await userModel.findOne({email : email})
        if(user){
            res.send({status : "failed" , message :"user already exits"})
        }else{
            if(name && email && password && password_confirmation && tc){
                if(password === password_confirmation){
                    try{
                         const salt = await bcrypt.genSalt(10)
                         const Hashpassword = await bcrypt.hash(password,salt)
                         const doc = new userModel({
                            name : name,
                            email : email,  
                            password : Hashpassword,
                            tc : tc
                         })
                         await doc.save()
                         const saved_user = await userModel.findOne({email: email})
                         //genarste jwt token
                         const token = jwt.sign({userID : saved_user._id},process.env.JWT_SECRET_KEY,{expiresIn : '5d'})
                         res.send({status : "success" , message : "registered", 'token': token})
                    }catch(error){
                      res.send({status : "failed" , message : "unable to registered"})
                    }
                }else{
                    res.send({status : "failed ", message : "password don't match with confrim password"})
                }
            }else{
                res.send({status : "failed" , message : "All field are required"})
            }
        }
    }


    static userLogin = async (req,res) =>{
        try {
            const {email , password} =req.body
            if(email && password){
                const   user = await userModel.findOne({email : email})
                if(user){
                        const isMatch = await bcrypt.compare(password , user.password)
                        if((user.email === email)&& isMatch){
                            //genarste jwt token
                         const token = jwt.sign({userID : user._id},process.env.JWT_SECRET_KEY,{expiresIn : '5d'})
                            res.send({status :"success" , message: "login successfull" , "token" : token})
                        }else{
                            res.send({message : "invalid detail"})
                        }
                }else{
                    res.send({message : "User not found"})
                }
            }else{
                res.send({status :"failed" , message: "both field are required"})
            }
        } catch (error) {
            res.send({status : "failed", message : "login failed"})
        }
    }
    static changedpassword = async (req,res) =>{
        const {password , password_confirmation } = req.body;
        console.log(password)
        console.log(password_confirmation)
        if(password && password_confirmation){
            if(password !== password_confirmation){
                res.send({message : "both password does not match"})
            }else{
                const salt = await bcrypt.genSalt(10)
                const newHashpassword = await bcrypt.hash(password , salt)
                res.send({status : "success" , message : "changed password "})
            }
        }else{
            res.send({status : "failed", message : "All field are requried"})
        }
    }
}

export default UserController;