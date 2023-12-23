const express = require("express");
const userRoute = express.Router();
const userController = require("../controller/user.controller");
const { auth } = require("../middleware/auth");

userRoute.post("/register", userController.register);
userRoute.post("/login", userController.login);
userRoute.get("/verify/:token", userController.verifyEmailToken);
userRoute.post("/addAdress", auth, userController.addNewAddress);
userRoute.get("/getAdress", auth, userController.getUserAddress);

module.exports = {
  userRoute,
};
