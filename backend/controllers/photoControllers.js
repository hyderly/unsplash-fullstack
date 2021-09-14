import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

import { PhotoModel } from "../models/PhotoModel.js";

export const createPhoto = asyncHandler(async (req, res) => {
  const { photo, label } = req.body;

  if (!photo || !label) {
    res.status(400).send({ messages: ["Invalid photo or label"] });
  }

  const newPhoto = new PhotoModel({
    user: req.user._id,
    photo,
    label,
  });

  newPhoto.save();

  if (newPhoto) {
    res.status(200).json({ message: "Photo created" });
  } else {
    res.status(400).json({ message: "photo not created" });
  }
});

export const getAllPhotosOfUser = asyncHandler(async (req, res) => {
  const user = req.user;
  const allPhotos = await PhotoModel.find({ user: user._id });

  res.status(200).json({ data: allPhotos });
});

export const getPhotos = asyncHandler(async (req, res) => {
  const photos = await PhotoModel.find({});

  if (photos.length > 0) {
    res.status(200).json({ data: photos });
  } else {
    res.status(400).json({ message: "no photos found" });
  }
});

export const getPhotoByLabel = asyncHandler(async (req, res) => {
  const label = req.query.label;
  const photo = await PhotoModel.findOne({ label });

  if (photo) {
    res.status(200).json({ data: photo });
  } else {
    res.status(400).json({ message: "no photo found" });
  }
});

export const deletePhotoById = asyncHandler(async (req, res) => {
  const photoId = req.params.id;
  const photo = await PhotoModel.findOne({ _id: photoId });
  if (photo) {
    photo.remove();
    res.status(200).json({ message: "photo deleted" });
  } else {
    res.status(400).json({ message: "photo not found" });
  }
});

export const updatePhoto = asyncHandler(async (req, res) => {
  const photoId = req.params.id;
  const { photo, label } = req.body;
  const photoToUpdate = await PhotoModel.findOne({ _id: photoId });

  if (photoToUpdate) {
    photoToUpdate.photo = photo;
    photoToUpdate.label = label;
    photoToUpdate.save();
    res.status(200).json({ message: "photo updated" });
  } else {
    res.status(400).json({ message: "photo not found" });
  }
});

export const detleteAllPhotos = asyncHandler(async (req, res) => {
  await PhotoModel.deleteMany({});
  res.status(200).json({ message: "all photos deleted" });
});
