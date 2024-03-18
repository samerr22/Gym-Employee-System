import mongoose from 'mongoose';

const AbsentSchema = new mongoose.Schema(
  {
   
    Email: {
      type: String,
      required: true,
      
    },
    Phone: {
        type: Number,
        required: true,
     
      },
      desc: {
        type: String,
        required: true,
     
      },
   
   
   
  },
  { timestamps: true }
);

const Absent = mongoose.model('Absent', AbsentSchema);

export default Absent;