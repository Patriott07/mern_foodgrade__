import express from "express";
import {createUser, getUsers, updateUser, getDetailUser, isAuthUser, registerAction, authWithBarcode, setInformationUser, verifyOtp,loginaction, refreshOtp, changepassword, forgetPassword} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/getUsers', getUsers);
router.get('/user/:id', isAuthUser, getDetailUser);
router.post('/user', createUser);
router.post('/user/setinfo/:userId', setInformationUser);
router.post('/user/update', isAuthUser, updateUser);
router.post('/auth/login', loginaction);
router.post('/auth/register', registerAction);
router.post('/auth/refreshotp', refreshOtp);
router.post('/auth/verifyotp', verifyOtp);
router.post('/auth/changepassword', isAuthUser, changepassword);
router.post('/auth/forgetpassword', forgetPassword);
router.post('/qrcode', authWithBarcode);


export default router;