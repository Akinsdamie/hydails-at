"use strict";
const blogService = require("../services/BlogService");
const response = require("../utils/responses");

exports.createBlog = async (req, res) => {
  const { error, data, statusCode } = await blogService.createBlog(
    req.body,
    req
  );

  if (error) return response.error(res, error, statusCode);

  return response.success(res, data, statusCode);
};

exports.getBlogs = async (req, res) => {
  const { error, data, statusCode } = await blogService.getBlogs(req);

  if (error) return response.error(res, error, statusCode);

  return response.success(res, data, statusCode);
};

exports.getBlog = async (req, res) => {
  const { error, data, statusCode } = await blogService.getBlog(req);

  if (error) return response.error(res, error, statusCode);

  return response.success(res, data, statusCode);
};

exports.updateBlog = async (req, res) => {
  const { error, data, statusCode } = await blogService.updateBlog(req);

  if (error) return response.error(res, error, statusCode);

  return response.success(res, data, statusCode);
};

exports.deleteBlog = async (req, res) => {
  const { error, data, statusCode } = await blogService.deleteBlog(req);

  if (error) return response.error(res, error, statusCode);

  return response.success(res, data, statusCode);
};

exports.getBlogsByAuthor = async (req, res) => {
  const { error, data, statusCode } = await blogService.getBlogsByAuthor(req);

  if (error) return response.error(res, error, statusCode);

  return response.success(res, data, statusCode);
};


