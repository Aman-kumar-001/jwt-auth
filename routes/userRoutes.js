import express from 'express'
const router =  express.Router();
import UserController from '../controller/usercontroller.js';

//Public
router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)


//Private 


export default router;