"use strict";
const Blog = require("../models/BlogModel");
const { StatusCodes } = require("http-status-codes");
const blogValidator = require("../validators/BlogValidator");

exports.createBlog = async (body, req) => {
  try {
    const validatorError = await blogValidator.createBlog(body);

    if (validatorError) {
      return {
        error: validatorError,
        statusCode: StatusCodes.BAD_REQUEST,
      };
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    const createBlog = await Blog.create({
      blogTitle: body.blogTitle,
      blogBody: body.blogBody,
      author: body.author,
      date: body.date,
      image: imageUrl,
    });

    return {
      data: createBlog,
      statusCode: StatusCodes.CREATED,
    };
  } catch (e) {
    console.log("An unknown error has occurred", +e);
    return {
      error: e.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

exports.getBlogs = async (req) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    return {
      data: blogs,
      statusCode: StatusCodes.OK,
    };
  } catch (e) {
    console.log("An unknown error has occurred", +e);
    return {
      error: e.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

exports.getBlog = async (req) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return {
        error: "Blog not found",
        statusCode: StatusCodes.NOT_FOUND,
      };
    }

    return {
      data: blog,
      statusCode: StatusCodes.OK,
    };
  } catch (e) {
    console.log("An unknown error has occurred", +e);
    return {
      error: e.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

exports.updateBlog = async (req) => {
  try {
    const validatorError = await blogValidator.createBlog(req.body);

    if (validatorError) {
      return {
        error: validatorError,
        statusCode: StatusCodes.BAD_REQUEST,
      };
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!blog) {
      return {
        error: "Blog not found",
        statusCode: StatusCodes.NOT_FOUND,
      };
    }

    return {
      data: blog,
      statusCode: StatusCodes.OK,
    };
  } catch (e) {
    console.log("An unknown error has occurred", +e);
    return {
      error: e.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

exports.deleteBlog = async (req) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return {
        error: "Blog not found",
        statusCode: StatusCodes.NOT_FOUND,
      };
    }

    return {
      data: { message: "Blog deleted successfully" },
      statusCode: StatusCodes.OK,
    };
  } catch (e) {
    console.log("An unknown error has occurred", +e);
    return {
      error: e.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};
