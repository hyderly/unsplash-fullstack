import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import UserModel from "../models/UserModel.js";

export const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = await jwt.verify(token, process.env.jwt_secret);
      req.user = await UserModel.findById(decodedToken.id);
      next();
    } catch (error) {
      res.status(400);
      throw new Error("Invalid Token");
    }
  }

  if (!token) {
    res.status(400);
    throw new Error("Token not found");
  }
});

export const AdminAuthentication = asyncHandler(async (req, res, next) => {
  const user = req.user;

  if(!user || !user.isAdmin) {
    res.status(401).send("Unauthorized to this route");

  }

  next();
});
