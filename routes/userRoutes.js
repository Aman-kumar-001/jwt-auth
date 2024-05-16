import express from 'express'
const router =  express.Router();
import UserController from '../controller/usercontroller.js';
import checkUserAuth from '../middleware/auth_middleware.js';

//route middleware
router.use('/changedpassword' , checkUserAuth)

//Public
router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)


//Private 
router.post('/changedpassword', UserController.changedpassword)


export default router;