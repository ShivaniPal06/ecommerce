import mongoose from "mongoose";
// import { trim } from "validator";

// Define a schema for the user model
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  answer: {
    type: {},
    required: true,
  },
  role: {
    type: Number,
    default: 0,
  },
}, {timestamps: true});

// Export the default model of the "users" collection using the userSchema
export default mongoose.model("users", userSchema);