"use strict";
const Joi = require("joi");
const { validate } = require("../utils/helpers");

exports.createUser = async (body) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(15).required(),
    phone: Joi.string().optional().allow(""),
  });

  return validate(body, schema);
};

exports.loginUser = async (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(15).required(),
  });

  return validate(body, schema);
};
