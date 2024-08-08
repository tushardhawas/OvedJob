import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [3, "Name must contain at least 3 characters"],
    maxLength: [30, "Name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    validate: [validator.isEmail, "Please enter a valid email"],
    unique: true, // Ensure email is unique
  },
  phone: {
    type: String, // Changed to String to accommodate various phone number formats
    required: [true, "Please provide your phone number"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minLength: [8, "Password must contain at least 8 characters"],
    maxLength: [32, "Password cannot exceed 32 characters"],
  },
  role: {
    type: String,
    required: [true, "Please provide your role"],
    enum: ["Job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Optional fields for password reset functionality
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function(next){
if(!this.isModified("password")){
next();

}
})