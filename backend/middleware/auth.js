const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user");

require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization;

    if (!token) return res.status(404).json({ msg: "token is not provided" });
    const decode = jwt.verify(token, process.env.accessToken);
    const user = await UserModel.findOne({ _id: decode.userId });
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user;
    req.userId = decode.userId;
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { auth };
