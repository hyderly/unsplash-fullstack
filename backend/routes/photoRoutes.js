import express from "express";
const router = express.Router();

// Autherization
import {
  protectRoute,
  AdminAuthentication,
} from "../middlewares/authentication.js";

import {
  createPhoto,
  getAllPhotosOfUser,
  getPhotos,
  getPhotoByLabel,
  deletePhotoById,
  updatePhoto,
  detleteAllPhotos,
} from "../controllers/photoControllers.js";

router.post("/create", protectRoute, createPhoto);
router.get("/user/all", protectRoute, getAllPhotosOfUser);
router.get("/all", protectRoute, AdminAuthentication, getPhotos);
router.get("/search?", protectRoute, getPhotoByLabel);
router.delete("/:id", protectRoute, deletePhotoById);
router.put("/:id", protectRoute, updatePhoto);
router.delete("/", protectRoute, AdminAuthentication, detleteAllPhotos);

export default router;
