import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  verification_code: { type: Number },
  reset_code: { type: Number },
  reset_code_expires: { type: Date },
});

export default mongoose.model("Admin", AdminSchema);
