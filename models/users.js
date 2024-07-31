import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must contain at least 3 characters!"],
    maxLength: [30, "name cannot exceed 30 characrter!"],
  },
  email: {
    required: [true, "please provide your email"],
    validate: [validator.isEmail, "please enter a valid Email"],
  },
  phone: {
    type: Number,
    required: [true, "please provide your phone number."],
  },
  password:{
    type:String,
    required:[true,"please provide your password"],
    minLength:[8,"password must conatin atleast 8 character"], 
    maxLength:[32,"canoot excced"]
  },
  role:{
    type:String,
    required:[true,"please provide yor role"],
    enum:["Job Seeker" , "Employer"],
  },
  createdAt:{
    type:Date,
    default:Date.now,
  }
   
});
