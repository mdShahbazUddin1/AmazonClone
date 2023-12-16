const express = require("express");
const userRoute = express.Router();
const userController = require("../controller/user.controller");

userRoute.post("/register", userController.register);
userRoute.post("/login", userController.login);
userRoute.get("/verify/:token", userController.verifyEmailToken);

module.exports = {
  userRoute,
};
