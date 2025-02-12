import mongoose from "mongoose";
import Student from "./models/student-model.js";
import dotenv from "dotenv";

dotenv.config();

const generateStudents = (count) => {
  const programs = ["Electrical Engineering", "Mechanical Engineering"];
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  const firstNames = ["Carlos", "Angela", "Diego", "Sofia", "Miguel", "Elena", "Rafael", "Camila", "Luis", "Isabella", "Javier", "Mariana", "Fernando", "Valeria", "Andres", "Paula", "Roberto", "Beatriz", "Daniel", "Luisa", "Eduardo", "Clara", "Joaquin"];
  const lastNames = ["Fernandez", "Torres", "Lopez", "Gomez", "Santiago", "Ramos", "Mendoza", "Del Rosario", "Castillo", "Reyes", "Cruz", "Ortega", "Silva", "Navarro", "Domingo", "Herrera", "Jimenez", "Padilla", "Aguilar", "Vega", "Salazar", "Fuentes", "Rojas"];
  const middleInitials = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const students = [];
  for (let i = 1; i <= count; i++) {
    const student_id = 2025000 + i;
    const first_name = firstNames[Math.floor(Math.random() * firstNames.length)];
    const middle_initial = middleInitials[Math.floor(Math.random() * middleInitials.length)];
    const last_name = lastNames[Math.floor(Math.random() * lastNames.length)];
    const year = years[Math.floor(Math.random() * years.length)];
    const program = programs[Math.floor(Math.random() * programs.length)];
    const GWA = (Math.random() * (5.0 - 1.0) + 1.0).toFixed(2); 
    const LO7 = Math.random() < 0.3 ? "Yes" : "No"; 

    students.push({ student_id, first_name, middle_initial, last_name, year, GWA, program, LO7 });
  }

  return students;
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    await Student.deleteMany(); 
    await Student.insertMany(generateStudents(200));

    console.log("Student data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error.message);
    process.exit(1);
  }
};

seedDatabase();
