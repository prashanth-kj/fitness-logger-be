import express from 'express';
import userController from '../controller/userController.js'
const router= express.Router();

router.post('/create',userController.createUser);
router.post('/login',userController.login);
router.post('/forget-password',userController.forgetPassword);
router.post('/reset-password',userController.resetPassword)

export default router;