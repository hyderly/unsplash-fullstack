import express from "express";
const router = express.Router();

// Autherization
import { protectRoute } from "../middlewares/authentication.js";

// Controllers
import {
  userRegister,
  authUser,
  verifyUser,
  forgotPassword,
  resetpassword,
  getPorfile,
  updateProfile,
} from "../controllers/userControllers.js";

router.post("/register", userRegister);
router.put("/emailverify/:verifytoken", verifyUser);
router.post("/login", authUser);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetpassword);
router.get("/profile", protectRoute, getPorfile);
router.put("/profile", protectRoute, updateProfile);

export default router;
