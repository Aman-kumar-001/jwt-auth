import jwt from 'jsonwebtoken';
import userModel from '../models/user.js';

var checkUserAuth = async (req,res , next) =>{
    let token 
    const {authorization } = req.headers;
    if(authorization && authorization.startsWith('bearer')){
        try {
            token = authorization.split(' ')[1]

            //verfiy token
            const  {userID} = jwt.verify(token , process.env.JWT_SECRET_KEY)
           
            //get user from token
            req.user = await userModel.findById(userID).select('-password' )
           
            next()
        } catch (error) {
             res.send({message : "unauthorized user"})
        }
    }
    if(!token){
        res.send({message : "token not found"})
    }
}

export default  checkUserAuth;