import express from "express";
import {CreateAdmin,forgotPassword,resendVerificationCode,resetPassword,Login} from "../controller/Admin.js"

const router = express.Router();

router.post ("/CreateAdmin", CreateAdmin);
router.post ("/forgotPassword",forgotPassword)
router.post ("/resendVerificationCode",resendVerificationCode)
router.post ("/resetPassword",resetPassword)
router.post ("/login",Login)

export default router;