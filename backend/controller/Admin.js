import Admin from "../models/admin-model.js";
import { sendVerificationCode, sendResetPasswordCode } from "../utils/mail.js";

export const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) return res.status(409).json({ message: "Admin already exists", success: false });

    const newAdmin = new Admin({ email, password });
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully!", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(404).json({ message: "Admin not found", success: false });
    if (admin.password !== password) return res.status(401).json({ message: "Incorrect password", success: false });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    admin.otp = otp;
    admin.otpExpires = otpExpires;
    await admin.save();

    await sendVerificationCode(email, otp);

    res.status(200).json({ 
      message: "OTP sent to email", 
      success: true,
      adminId: admin._id 
    });

  } catch (error) {
    res.status(500).json({ message: "Error processing request", error: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(404).json({ message: "Admin not found", success: false });
    if (!admin.otp || !admin.otpExpires) return res.status(400).json({ message: "OTP not generated.", success: false });
    if (admin.otpExpires < new Date()) return res.status(400).json({ message: "OTP expired.", success: false });
    if (admin.otp !== otp) return res.status(400).json({ message: "Invalid OTP.", success: false });

    admin.otp = null;
    admin.otpExpires = null;
    await admin.save();

    res.status(200).json({ message: "OTP verified successfully!", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error: error.message });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(404).json({ message: "Admin not found", success: false });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    admin.otp = otp;
    admin.otpExpires = otpExpires;
    await admin.save();

    await sendVerificationCode(email, otp);

    res.status(200).json({ message: "New OTP sent to email", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(404).json({ message: "Admin not found", success: false });

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetExpires = new Date(Date.now() + 10 * 60 * 1000);

    admin.resetCode = resetCode;
    admin.resetExpires = resetExpires;
    await admin.save();

    await sendResetPasswordCode(email, resetCode);

    res.status(200).json({ message: "Password reset code sent to email", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, resetCode, newPassword } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(404).json({ message: "Admin not found", success: false });
    if (!admin.resetCode || !admin.resetExpires) return res.status(400).json({ message: "Reset code not generated.", success: false });
    if (admin.resetExpires < new Date()) return res.status(400).json({ message: "Reset code expired.", success: false });
    if (admin.resetCode !== resetCode) return res.status(400).json({ message: "Invalid reset code.", success: false });

    admin.password = newPassword;
    admin.resetCode = null;
    admin.resetExpires = null;
    await admin.save();

    res.status(200).json({ message: "Password reset successfully!", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;  
    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    if (admin.password !== oldPassword) {
      return res.status(401).json({ message: "Incorrect old password" });
    }

    admin.password = newPassword;
    await admin.save();

    return res.json({ message: "Password changed successfully", success: true });

  } catch (error) {
    return res.status(500).json({ message: "Error changing password", error: error.message });
  }
};







