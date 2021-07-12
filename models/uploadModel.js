import mongoose from 'mongoose';


const uploadSchema = mongoose.Schema({
  file: {
    type: String,
    required: true
  }
})

const Upload = mongoose.model('Upload', uploadSchema)

export default Upload