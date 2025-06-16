"use strict";
const express = require("express");
const router = express.Router();
const controller = require("../app/controller/BlogController");
const { authenticateUser } = require("../app/middleware/authMiddleware");
const upload = require("../app/utils/imageUploader");

//EAMPLE ON HOW TO PASS THE AUTH MIDDLEWARE

router.post(
  "/create-blog",
  authenticateUser,
  upload.single("image"),
  controller.createBlog
);

router.get("/blogs", controller.getBlogs);

router.get("/blog/:id", controller.getBlog);

router.put(
  "/update-blog/:id",
  authenticateUser,
  upload.single("image"),
  controller.updateBlog
);

router.delete("/delete-blog/:id", authenticateUser, controller.deleteBlog);

module.exports = router;
