import mongoose from 'mongoose'

var Patient = mongoose.Schema({
  firstName : String,
  lastName : String,
  gender : String,
  dob : String,
  phone : Number,
  txt:String
});

export default mongoose.model('patients',Patient);
