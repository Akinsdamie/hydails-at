"use strict";
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const authValidator = require("../validators/AuthValidator");
const jwt = require("jsonwebtoken");

exports.createUser = async (body) => {
  try {
    const validatorError = await authValidator.createUser(body);
    if (validatorError) {
      return {
        error: validatorError,
        statusCode: StatusCodes.BAD_REQUEST,
      };
    }

    const { username, email, password, phone } = body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return {
        error: "User with this email already exists",
        statusCode: StatusCodes.CONFLICT,
      };
    }

    // Create a new user
    const user = await User.create({
      username: body.username,
      email,
      password: body.password,
      phone: body.phone,
    });

    return {
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          phone: user.phone,
        },
      },
      statusCode: StatusCodes.CREATED,
    };
  } catch (e) {
    console.log("An Unknown Error Occurred", e);
    return {
      error: e.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};
