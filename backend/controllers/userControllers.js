import asyncHandler from "express-async-handler";

import generateWebToken from "../utils/generateToken.js";

// Import model
import UserModel from "../models/UserModel.js";

export const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Check if user is exist
  const isExists = await UserModel.findOne({ email });

  if (isExists) {
    throw new Error("User Already exist with this email address");
  }

  if (confirmPassword !== password) {
    throw new Error("Password Must Match");
  }

  // Create new user
  const user = await UserModel.create({ name, email, password });

  if (user) {
    res.status(200).send({
      user,
      token: generateWebToken(user._id),
    });
  }
});

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("Wrong Email or Password");
  }

  const isMatched = await user.matchPassword(password);

  if (!isMatched) {
    throw new Error("Wrong Email or Password");
  }

  if (!email || !password) {
    throw new Error("Please enter email and password");
  }

  if (user && isMatched) {
    res.status(200).send({
      id: user._id,
      isAdmin: user.isAdmin,
      name: user.name,
      active: user.isActive,
      email,
      token: generateWebToken(user._id),
    });
  }
});
