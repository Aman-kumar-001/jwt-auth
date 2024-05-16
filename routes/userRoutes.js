import express from 'express'
const router =  express.Router();
import UserController from '../controller/usercontroller.js';

//Public
router.post('/register', UserController.userRegistration)


//Private 


export default router;