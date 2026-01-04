import bcrypt from "bcrypt";
import User from "../models/User.js";

export const signupUser = async (userData) => {
  const {
    name,
    email,
    phone,
    password,
    role,
    address,
    location,
    state,
    district
  } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  //  Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  //  Create user
  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
    role,
    address,
    location,
    state,
    district
  });

  return user;
};
