import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from './lib/db.js';
import StudentRoutes from "./routes/student.js";
import AdminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();


const corsOptions = {
  origin: "http://localhost:5173", 
  credentials: true, 
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.use("/api/student/list", StudentRoutes);
app.use("/api/admin", AdminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
