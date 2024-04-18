const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        status: 401,
        message: "Access denied. Invalid token.",
      });
    }
    const token = authHeader.split(" ")[1];
    console.log(token);
    if (!token) return res.status(403).send("Access denied please login");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded)
    const user = await User.findById(decoded?.id);
    req.user = user;
    req.role = decoded.role;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp <= currentTimestamp) {
      return res.json({
        status: 401,
        message: "Access denied. Invalid token.",
      });
    }
    next();
  } catch (error) {
    return res.send({
      status: 500,
      message: "token issue please login or try again later",
      data: null,
    });
  }
});
const isAdmin = asyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.json({
        status: 401,
        message: "Access denied. Invalid token.",
      });
    }
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(403).send("Access denied.");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await User.findById(decoded?.id);
    req.user = admin;
    if (admin.role !== "admin") {
      throw new Error("You are not an Admin");
    } else {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (decoded.exp <= currentTimestamp) {
        return res.json({
          status: 401,
          message: "Token expired. Please sign in again.",
          data: null,
        });
      }
      next();
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: "token issue please login or try again later",
    });
  }
});

module.exports = { authMiddleware, isAdmin };
