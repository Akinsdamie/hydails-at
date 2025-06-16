"use strict";
const express = require("express");
const router = express.Router();
const controller = require("../app/controller/authController");

// POST /auth/signup
router.post("/signup", controller.createUser);

// POST /auth/login
router.post("/login", controller.login);

module.exports = router;
