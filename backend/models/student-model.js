import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  student_id: {
    type: Number,
    required: true,
    unique: true
  },
  first_name: {
    type: String,
    default: null
  },
  middle_initial: {
    type: String,
    default: null
  },
  last_name: {
    type: String,
    default: null
  },
  year: {
    type: String,
    enum: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
    required: true
  },
  program: {
    type: String,
    enum: ['Electrical Engineering', 'Mechanical Engineering'],
    required: true
  },
  GWA: {
    type: Number,
    required: true,
    min: 1.0,
    max: 5.0,
    validate: {
      validator: function (value) {
        return value >= 1.0 && value <= 5.0;
      },
      message: 'GWA must be between 1.0 and 5.0'
    }
  },
  LO7: {
    type: String,
    enum: ['Yes', 'No'],
    required: true
  }
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
