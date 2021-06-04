import express from "express";
const router = express.Router();

// Controllers
import { userRegister, authUser } from "../controllers/userControllers.js";

router.post("/register", userRegister);
router.post("/login", authUser);

export default router;
