import express from "express";
import { createAdmin, loginAdmin, verifyOtp, resendOtp, forgotPassword, resetPassword, changePassword} from "../controller/Admin.js";

const router = express.Router();

router.post("/create-admin", createAdmin);
router.post("/login", loginAdmin);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post ("/change-password", changePassword)


export default router;
