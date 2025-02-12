import Student from '../models/student-model.js';

export const CreateStudent = async (req, res) => {
  try {
    const { first_name, middle_initial, last_name, year, GWA, student_id, program, LO7 } = req.body;

    const existingStudent = await Student.findOne({
      first_name,
      last_name,
      year,
      student_id,
      program,
    });

    if (existingStudent) {
      return res.status(409).json({ message: "Student already exists", success: false });
    }

    const newStudent = new Student({
      first_name,
      middle_initial,
      last_name,
      year,
      GWA,
      student_id,
      program,
      LO7, 
    });

    await newStudent.save();

    res.status(201).json({ message: "Student created successfully!", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error: error.message });
  }
};


export const UpdateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, middle_initial, last_name, year, GWA, program, LO7 } = req.body;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found", success: false });
    }

    student.first_name = first_name;
    student.middle_initial = middle_initial;
    student.last_name = last_name;
    student.year = year;
    student.GWA = GWA;
    student.program = program;
    student.LO7 = LO7; 

    await student.save();

    res.status(200).json({ message: "Student updated successfully!", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error: error.message });
  }
};


export const DeleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Student.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Student not found", success: false });
    }

    res.status(200).json({ message: "Student deleted successfully!", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error: error.message });
  }
};

export const GetStudents = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      if (!isNaN(search)) {
   
        query = { student_id: Number(search) };
      } else {
    
        query = {
          $or: [
            { first_name: { $regex: search, $options: "i" } },
            { last_name: { $regex: search, $options: "i" } },
            { program: { $regex: search, $options: "i" } },
          ],
        };
      }
    }

    const students = await Student.find(query);

    res.status(200).json({ students, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error: error.message });
  }
};
