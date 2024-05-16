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
}

export default UserController;