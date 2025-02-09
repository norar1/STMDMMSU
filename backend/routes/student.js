import express from "express";
import {
  CreateStudent,
  GetStudents,
  UpdateStudent,
  DeleteStudent,
} from "../controller/Student.js"

const router = express.Router();

router.post("/CreateStudent", CreateStudent);

router.get("/GetStudents", GetStudents);

router.put("/UpdateStudent/:id", UpdateStudent);

router.delete("/DeleteStudent/:id", DeleteStudent);

export default router;
