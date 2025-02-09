import Admin from "../models/admin-model.js";
import { sendResetCode, sendVerificationCode } from "../utils/mail.js";

export const CreateAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already exists", success: false });
    }

    const newAdmin = new Admin({ email, password });

    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully!", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found", success: false });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000);
    const resetCodeExpires = new Date(Date.now() + 10 * 60 * 1000);

    admin.reset_code = resetCode;
    admin.reset_code_expires = resetCodeExpires;
    await admin.save();

    await sendResetCode(email, resetCode);

    return res.status(200).json({ message: "Reset code sent to your email.", success: true });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const resetPassword = async (req, res) => {
  const { email, reset_code, newPassword } = req.body;

  try {
    const admin = await Admin.findOne({ email, reset_code });

    if (!admin || admin.reset_code_expires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired reset code", success: false });
    }

    admin.password = newPassword;
    admin.reset_code = null;
    admin.reset_code_expires = null;
    await admin.save();

    return res.status(200).json({ message: "Password reset successful", success: true });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const resendVerificationCode = async (req, res) => {
  const { email } = req.body;

  try {
    const admin = await Admin.findOne({ email, verified: false });

    if (!admin) {
      return res.status(404).json({ message: "User not found or already verified", success: false });
    }

    const newVerificationCode = Math.floor(100000 + Math.random() * 900000);

    admin.verification_code = newVerificationCode;
    await admin.save();

    await sendVerificationCode(email, newVerificationCode);

    return res.status(200).json({ message: "A new verification code has been sent.", success: true });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password, verification_code } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: "Invalid email format", success: false });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found", success: false });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }

    if (admin.verified) {
      return res.status(200).json({ message: "Login successful", success: true });
    }

    if (verification_code) {
      if (admin.verification_code !== verification_code) {
        return res.status(400).json({ message: "Invalid verification code", success: false });
      }

      admin.verified = true;
      admin.verification_code = null;
      await admin.save();

      return res.status(200).json({ message: "Verification successful. Login successful", success: true });
    }

    const newVerificationCode = Math.floor(100000 + Math.random() * 900000);
    admin.verification_code = newVerificationCode;
    await admin.save();

    await sendVerificationCode(email, newVerificationCode);

    return res.status(401).json({ message: "Verification code sent. Please verify", success: false });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
